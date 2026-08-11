const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".md": "text/markdown" };
const PORT = process.env.PORT || 4173;
const HOST = process.env.HOST || "127.0.0.1";
const SEC_USER_AGENT = process.env.SEC_USER_AGENT || "CatalystRadarMVP/0.1 contact: local-dev@example.com";
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || "";
const FORMS = ["8-K", "S-1", "424B5", "424B3", "SC 13D", "SC 13G", "10-Q", "10-K"];
const DATA_DIR = process.env.DATA_DIR || path.join(root, "data");
const LEDGER_FILE = path.join(DATA_DIR, "signal-ledger.json");
const PROTOCOL = Object.freeze({
  version: "quote-snapshot-v1",
  direction: "bullish",
  freshnessMinutes: 30,
  minimumDayMovePercent: 2,
  targetPercent: 2,
  stopPercent: -1,
  horizonMinutes: 60,
  minimumExpirationSnapshots: 20,
  paperStartingBalance: 1000,
  paperPositionDollars: 100,
  estimatedRoundTripCostPercent: 0.3
});

let catalystCache = { at: 0, payload: null };
let tickerMapCache = { at: 0, map: new Map() };
let quoteCache = { at: 0, map: new Map(), error: null };
let signalLedger = loadSignalLedger();
let trackerBusy = false;

function emptyLedger() {
  return { version: 1, updatedAt: new Date().toISOString(), signals: {} };
}

function loadSignalLedger() {
  try {
    const parsed = JSON.parse(fs.readFileSync(LEDGER_FILE, "utf8"));
    if (parsed?.version === 1 && parsed.signals && typeof parsed.signals === "object") return parsed;
  } catch (error) {
    if (error.code !== "ENOENT") console.warn(`Could not read signal ledger: ${error.message}`);
  }
  return emptyLedger();
}

function saveSignalLedger() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const temporary = `${LEDGER_FILE}.tmp`;
    signalLedger.updatedAt = new Date().toISOString();
    fs.writeFileSync(temporary, JSON.stringify(signalLedger, null, 2));
    fs.renameSync(temporary, LEDGER_FILE);
  } catch (error) {
    console.warn(`Could not persist signal ledger: ${error.message}`);
  }
}

function percentageChange(price, entryPrice) {
  if (!Number.isFinite(price) || !Number.isFinite(entryPrice) || entryPrice <= 0) return null;
  return ((price - entryPrice) / entryPrice) * 100;
}

function eligibilityFor(event) {
  if (event.category === "Offering / Dilution") {
    return { status: "excluded", reason: "Offering or dilution filings are excluded from the bullish baseline." };
  }
  if (event.ageMinutes > PROTOCOL.freshnessMinutes) {
    return { status: "excluded", reason: `The filing was already more than ${PROTOCOL.freshnessMinutes} minutes old when reviewed.` };
  }
  if (!Number.isFinite(event.price) || event.price <= 0) {
    return { status: "waiting", reason: "A current quote is required before the fixed test can start." };
  }
  if (!event.marketDataAt || Date.parse(event.marketDataAt) < Date.parse(event.updatedIso)) {
    return { status: "waiting", reason: "The available quote predates the filing, so a market response is not confirmed." };
  }
  if (!Number.isFinite(event.move) || event.move < PROTOCOL.minimumDayMovePercent) {
    return { status: "waiting", reason: `Current-day price activity has not reached the fixed +${PROTOCOL.minimumDayMovePercent}% threshold.` };
  }
  return { status: "tracking", reason: "Fresh filing and the fixed price-activity gate both passed." };
}

function baseSignal(event, observedAt) {
  return {
    id: event.id,
    symbol: event.symbol,
    company: event.company,
    category: event.category,
    source: event.source,
    sourceUrl: event.sourceUrl,
    filingAt: event.updatedIso,
    firstSeenAt: observedAt,
    lastSeenAt: observedAt,
    status: "waiting",
    reason: "Waiting for evaluation.",
    alertPrice: null,
    startedAt: null,
    targetPrice: null,
    stopPrice: null,
    latestPrice: Number.isFinite(event.price) ? event.price : null,
    dayMove: Number.isFinite(event.move) ? event.move : null,
    observations: [],
    maxGainPercent: null,
    maxLossPercent: null,
    resultReturnPercent: null,
    completedAt: null
  };
}

function addObservation(signal, price, quoteAt) {
  if (!Number.isFinite(price) || !quoteAt || Date.parse(quoteAt) < Date.parse(signal.startedAt)) return;
  if (signal.observations.some(item => item.at === quoteAt)) return;
  const change = percentageChange(price, signal.alertPrice);
  signal.observations.push({ at: quoteAt, price, changePercent: change });
  signal.observations = signal.observations.slice(-90);
  signal.latestPrice = price;
  const elapsedMinutes = (Date.parse(quoteAt) - Date.parse(signal.startedAt)) / 60000;
  if (elapsedMinutes > PROTOCOL.horizonMinutes) {
    const inWindow = signal.observations.filter(item => (Date.parse(item.at) - Date.parse(signal.startedAt)) / 60000 <= PROTOCOL.horizonMinutes);
    if (inWindow.length < PROTOCOL.minimumExpirationSnapshots) {
      signal.status = "incomplete";
      signal.reason = `Only ${inWindow.length} quote snapshots were captured inside the test window; this is not a valid result.`;
      signal.completedAt = quoteAt;
    } else {
      const lastInWindow = inWindow.at(-1);
      signal.maxGainPercent = Math.max(...inWindow.map(item => item.changePercent));
      signal.maxLossPercent = Math.min(...inWindow.map(item => item.changePercent));
      finishSignal(signal, "expired", lastInWindow.changePercent, lastInWindow.at, "Neither threshold appeared in the recorded quote snapshots within 60 minutes.");
    }
    return;
  }
  signal.maxGainPercent = signal.maxGainPercent === null ? change : Math.max(signal.maxGainPercent, change);
  signal.maxLossPercent = signal.maxLossPercent === null ? change : Math.min(signal.maxLossPercent, change);

  if (price >= signal.targetPrice) {
    finishSignal(signal, "target", PROTOCOL.targetPercent, quoteAt, "A recorded quote reached the +2% target.");
    return;
  }
  if (price <= signal.stopPrice) {
    finishSignal(signal, "stop", PROTOCOL.stopPercent, quoteAt, "A recorded quote reached the -1% stop.");
    return;
  }

  if (elapsedMinutes >= PROTOCOL.horizonMinutes) {
    if (signal.observations.length < PROTOCOL.minimumExpirationSnapshots) {
      signal.status = "incomplete";
      signal.reason = `Only ${signal.observations.length} quote snapshots were captured; this is not a valid expiration result.`;
      signal.completedAt = quoteAt;
    } else {
      finishSignal(signal, "expired", change, quoteAt, "Neither threshold appeared in the recorded quote snapshots within 60 minutes.");
    }
  }
}

function finishSignal(signal, status, resultReturnPercent, completedAt, reason) {
  signal.status = status;
  signal.resultReturnPercent = resultReturnPercent;
  signal.completedAt = completedAt;
  signal.reason = reason;
}

function updateSignalLedger(catalysts, observedAt) {
  for (const event of catalysts) {
    const signal = signalLedger.signals[event.id] || baseSignal(event, observedAt);
    signal.lastSeenAt = observedAt;
    signal.latestPrice = Number.isFinite(event.price) ? event.price : signal.latestPrice;
    signal.dayMove = Number.isFinite(event.move) ? event.move : signal.dayMove;
    signalLedger.signals[event.id] = signal;

    if (["target", "stop", "expired", "incomplete"].includes(signal.status)) continue;
    if (signal.startedAt) {
      addObservation(signal, event.price, event.marketDataAt || observedAt);
      continue;
    }

    const eligibility = eligibilityFor(event);
    signal.status = eligibility.status;
    signal.reason = eligibility.reason;
    if (eligibility.status !== "tracking") continue;

    signal.alertPrice = event.price;
    signal.startedAt = event.marketDataAt || observedAt;
    signal.targetPrice = event.price * (1 + PROTOCOL.targetPercent / 100);
    signal.stopPrice = event.price * (1 + PROTOCOL.stopPercent / 100);
    addObservation(signal, event.price, event.marketDataAt || observedAt);
  }
  pruneSignalLedger();
  saveSignalLedger();
}

function pruneSignalLedger() {
  const entries = Object.values(signalLedger.signals).sort((a, b) => Date.parse(b.lastSeenAt) - Date.parse(a.lastSeenAt));
  signalLedger.signals = Object.fromEntries(entries.slice(0, 1000).map(signal => [signal.id, signal]));
}

function publicSignal(signal) {
  if (!signal) return null;
  return {
    ...signal,
    observationCount: signal.observations.length,
    observations: signal.observations.slice(-65)
  };
}

function evidenceSummary() {
  const signals = Object.values(signalLedger.signals);
  const completed = signals.filter(signal => ["target", "stop", "expired"].includes(signal.status));
  const target = completed.filter(signal => signal.status === "target").length;
  const stop = completed.filter(signal => signal.status === "stop").length;
  const expired = completed.filter(signal => signal.status === "expired").length;
  const ordered = [...completed].sort((a, b) => Date.parse(a.completedAt) - Date.parse(b.completedAt));
  let balance = PROTOCOL.paperStartingBalance;
  let peak = balance;
  let maxDrawdown = 0;
  for (const signal of ordered) {
    const netPercent = signal.resultReturnPercent - PROTOCOL.estimatedRoundTripCostPercent;
    balance += PROTOCOL.paperPositionDollars * netPercent / 100;
    peak = Math.max(peak, balance);
    maxDrawdown = Math.min(maxDrawdown, balance - peak);
  }
  const averageNetReturn = completed.length
    ? completed.reduce((total, signal) => total + signal.resultReturnPercent - PROTOCOL.estimatedRoundTripCostPercent, 0) / completed.length
    : null;
  return {
    totalRecorded: signals.length,
    tracking: signals.filter(signal => signal.status === "tracking").length,
    waiting: signals.filter(signal => signal.status === "waiting").length,
    excluded: signals.filter(signal => signal.status === "excluded").length,
    incomplete: signals.filter(signal => signal.status === "incomplete").length,
    completed: completed.length,
    target,
    stop,
    expired,
    winRate: completed.length ? target / completed.length * 100 : null,
    averageNetReturn,
    paperBalance: balance,
    paperPnl: balance - PROTOCOL.paperStartingBalance,
    maxDrawdown,
    evidenceLevel: completed.length >= 500 ? "larger sample" : completed.length >= 250 ? "interesting" : completed.length >= 100 ? "preliminary" : "collecting"
  };
}

function evidencePayload() {
  return {
    protocol: PROTOCOL,
    persistence: {
      mode: "server-file",
      warning: "The ledger survives local restarts, but Render's ephemeral filesystem can reset it after a redeploy or instance replacement."
    },
    summary: evidenceSummary(),
    signals: Object.values(signalLedger.signals)
      .sort((a, b) => Date.parse(b.firstSeenAt) - Date.parse(a.firstSeenAt))
      .map(publicSignal)
  };
}

function attachEvidence(payload) {
  return {
    ...payload,
    catalysts: payload.catalysts.map(event => ({ ...event, evidence: publicSignal(signalLedger.signals[event.id]) })),
    evidence: evidencePayload()
  };
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}

function decodeXml(value = "") {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function secFetch(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": SEC_USER_AGENT,
      "Accept": "application/atom+xml,application/json,text/xml,*/*"
    }
  });
  if (!response.ok) throw new Error(`SEC returned ${response.status} for ${url}`);
  return response.text();
}

async function loadTickerMap() {
  const day = 24 * 60 * 60 * 1000;
  if (tickerMapCache.map.size && Date.now() - tickerMapCache.at < day) return tickerMapCache.map;
  const text = await secFetch("https://www.sec.gov/files/company_tickers_exchange.json");
  const json = JSON.parse(text);
  const fields = json.fields || [];
  const cikIndex = fields.indexOf("cik");
  const tickerIndex = fields.indexOf("ticker");
  const exchangeIndex = fields.indexOf("exchange");
  const map = new Map();
  for (const row of json.data || []) {
    const cik = String(row[cikIndex]).padStart(10, "0");
    const candidate = { ticker: row[tickerIndex], exchange: row[exchangeIndex] };
    const current = map.get(cik);
    if (!current || tickerQuality(candidate.ticker) > tickerQuality(current.ticker)) {
      map.set(cik, candidate);
    }
  }
  tickerMapCache = { at: Date.now(), map };
  return map;
}

function tickerQuality(ticker = "") {
  let score = 0;
  if (!ticker.includes("-")) score += 2;
  if (!/[WU]$|WS$|R$/.test(ticker)) score += 2;
  if (/^[A-Z]{1,5}$/.test(ticker)) score += 2;
  return score;
}

function parseEntries(xml, tickerMap) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml))) {
    const entry = match[1];
    const title = decodeXml((entry.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
    const link = ((entry.match(/<link[^>]+href="([^"]+)"/) || [])[1] || "").trim();
    const summary = decodeXml((entry.match(/<summary[^>]*>([\s\S]*?)<\/summary>/) || [])[1]);
    const updated = ((entry.match(/<updated>([\s\S]*?)<\/updated>/) || [])[1] || "").trim();
    const form = decodeXml(((entry.match(/<category[^>]+term="([^"]+)"/) || [])[1] || title.split(" - ")[0]).trim());
    const accession = ((entry.match(/accession-number=([^<]+)/) || [])[1] || link.split("/").at(-1) || `${form}-${updated}`).trim();
    const titleMatch = title.match(/^(.+?) - (.+?) \((\d{10})\)/);
    if (!titleMatch) continue;
    const company = titleMatch[2].replace(/\s+\(Filer\)$/i, "").trim();
    const cik = titleMatch[3];
    const tickerInfo = tickerMap.get(cik);
    const filingItems = extractFilingItems(summary);
    const classified = classifyFiling(form, summary, filingItems);
    const filedDate = (summary.match(/Filed:\s*(\d{4}-\d{2}-\d{2})/) || [])[1] || updated.slice(0, 10);
    const ageMinutes = Math.max(0, Math.round((Date.now() - Date.parse(updated)) / 60000));
    if (!tickerInfo?.ticker) continue;
    entries.push({
      id: accession,
      symbol: tickerInfo.ticker,
      company,
      sector: tickerInfo?.exchange || "SEC filer",
      category: classified.category,
      source: form,
      sourceUrl: link,
      updatedIso: updated,
      time: formatEt(updated),
      ageMinutes,
      headline: `${company}: ${classified.headline}`,
      summary: classified.summary,
      filingSummary: summary,
      filedDate,
      price: null,
      move: null,
      volume: null,
      float: null,
      spread: null,
      sentiment: classified.sentiment,
      risk: classified.risk,
      flags: classified.flags,
      why: classified.why,
      filingItems,
      history: null,
      live: true
    });
  }
  return entries;
}

async function fetchFinnhubQuote(symbol) {
  const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(FINNHUB_API_KEY)}`;
  const response = await fetch(url, { headers: { "Accept": "application/json" } });
  if (response.status === 429) throw new Error("Finnhub rate limit reached");
  if (!response.ok) throw new Error(`Finnhub returned ${response.status}`);
  const quote = await response.json();
  if (!Number.isFinite(quote.c) || quote.c <= 0) return null;
  return {
    price: quote.c,
    move: Number.isFinite(quote.dp) ? quote.dp : null,
    quoteChange: Number.isFinite(quote.d) ? quote.d : null,
    dayHigh: Number.isFinite(quote.h) ? quote.h : null,
    dayLow: Number.isFinite(quote.l) ? quote.l : null,
    dayOpen: Number.isFinite(quote.o) ? quote.o : null,
    previousClose: Number.isFinite(quote.pc) ? quote.pc : null,
    marketDataAt: quote.t ? new Date(quote.t * 1000).toISOString() : new Date().toISOString(),
    marketDataProvider: "Finnhub"
  };
}

async function enrichWithQuotes(catalysts) {
  if (!FINNHUB_API_KEY) {
    return { catalysts, marketData: { provider: null, status: "missing-key", message: "Set FINNHUB_API_KEY to enable quote enrichment." } };
  }

  const now = Date.now();
  if (quoteCache.map.size && now - quoteCache.at < 60_000) {
    return { catalysts: applyQuotes(catalysts, quoteCache.map), marketData: { provider: "Finnhub", status: "cached", error: quoteCache.error } };
  }

  const symbols = [...new Set(catalysts.map(item => item.symbol))]
    .filter(symbol => /^[A-Z.]{1,6}$/.test(symbol))
    .slice(0, 30);
  const map = new Map();
  let error = null;

  for (const symbol of symbols) {
    try {
      const quote = await fetchFinnhubQuote(symbol);
      if (quote) map.set(symbol, quote);
    } catch (quoteError) {
      error = quoteError.message;
      if (quoteError.message.includes("rate limit")) break;
    }
    await new Promise(resolve => setTimeout(resolve, 120));
  }

  quoteCache = { at: Date.now(), map, error };
  return {
    catalysts: applyQuotes(catalysts, map),
    marketData: {
      provider: "Finnhub",
      status: map.size ? "live" : "unavailable",
      enrichedSymbols: map.size,
      requestedSymbols: symbols.length,
      error
    }
  };
}

function applyQuotes(catalysts, quoteMap) {
  return catalysts.map(item => {
    const quote = quoteMap.get(item.symbol);
    if (!quote) return item;
    return {
      ...item,
      ...quote,
      flags: item.flags
        .filter(flag => flag !== "Market reaction needs price data")
        .concat(["Quote data connected"]),
      why: item.why
        .filter(reason => reason !== "Needs price and volume confirmation")
        .concat([Number.isFinite(quote.move) ? `Quote reaction is ${quote.move.toFixed(1)}%` : "Current quote is connected"])
    };
  });
}

const SEC_ITEM_NAMES = Object.freeze({
  "1.01": "material agreement",
  "1.02": "termination of an agreement",
  "2.01": "acquisition or sale of assets",
  "2.02": "financial results",
  "2.03": "new financial obligation",
  "2.04": "triggering event involving an obligation",
  "2.05": "restructuring costs",
  "2.06": "material impairment",
  "3.01": "listing or compliance notice",
  "3.02": "unregistered sale of securities",
  "3.03": "change to security-holder rights",
  "4.01": "change in accountant",
  "4.02": "non-reliance on prior financial statements",
  "5.01": "change in control",
  "5.02": "director or executive change",
  "5.03": "charter or bylaw change",
  "5.07": "shareholder vote results",
  "7.01": "Regulation FD disclosure",
  "8.01": "other material event",
  "9.01": "financial statements or exhibits"
});

function extractFilingItems(summary = "") {
  const itemSection = summary.match(/Items?\s*:\s*([0-9.,\s]+)/i)?.[1] || "";
  return [...new Set(itemSection.match(/\d+\.\d+/g) || [])];
}

function itemReason(items) {
  const meaningful = items.filter(item => item !== "9.01");
  if (!meaningful.length) return null;
  return meaningful.slice(0, 2).map(item => `Item ${item} (${SEC_ITEM_NAMES[item] || "reported event"})`).join(" and ");
}

function classifyFiling(form, summary, filingItems = []) {
  const text = `${form} ${summary}`.toLowerCase();
  const hasItem = item => filingItems.includes(item) || text.includes(`item ${item}`);
  const exactReason = itemReason(filingItems);
  const sourceReason = exactReason ? `SEC metadata reports ${exactReason}` : `Primary-source ${form} filing`;
  if (form.startsWith("S-1") || form.startsWith("424B")) {
    return {
      category: "Offering / Dilution",
      sentiment: "Negative",
      risk: "High",
      headline: "securities registration or offering filing",
      flags: ["Potential dilution", "Primary SEC filing", "Market reaction needs price data"],
      summary: "This filing may relate to securities registration or an offering. These can pressure a stock if investors expect dilution.",
      why: ["Primary-source SEC filing", "Financing terms can change investor expectations", "Needs price and volume confirmation"]
    };
  }
  if (form.startsWith("SC 13")) {
    return {
      category: "Ownership / Activist",
      sentiment: "Watch",
      risk: "Medium",
      headline: "large-holder ownership filing",
      flags: ["Ownership change", "Possible activist interest", "Read filing details"],
      summary: "Ownership filings can matter when a new large holder, activist, or strategic investor appears.",
      why: ["Primary-source ownership filing", "May reveal new investor intent", "Needs issuer and holder context"]
    };
  }
  if (hasItem("3.02")) {
    return {
      category: "Offering / Dilution",
      sentiment: "Negative",
      risk: "High",
      headline: "unregistered securities sale disclosed",
      flags: ["Possible dilution", "Read offering terms", "Downside risk"],
      summary: "An unregistered securities sale can dilute existing holders or signal a financing need. The price, size, and restrictions determine the impact.",
      why: [sourceReason, "New shares or convertible securities may expand the share count", "Needs financing terms and market confirmation"]
    };
  }
  if (hasItem("4.02")) {
    return {
      category: "Accounting Warning",
      sentiment: "Negative",
      risk: "High",
      headline: "prior financial statements may no longer be reliable",
      flags: ["Accounting reliability warning", "Read the filing immediately", "High uncertainty"],
      summary: "A non-reliance notice says prior financial statements or an audit report should no longer be relied upon. This can materially change investor confidence.",
      why: [sourceReason, "Previously reported financial information is in question", "Potentially significant downside catalyst"]
    };
  }
  if (hasItem("3.01")) {
    return {
      category: "Listing Risk",
      sentiment: "Negative",
      risk: "High",
      headline: "exchange listing or compliance notice disclosed",
      flags: ["Possible delisting risk", "Deadline may apply", "Read remediation details"],
      summary: "A listing notice can concern a bid-price, reporting, or other exchange requirement. The cure period and company's response determine the severity.",
      why: [sourceReason, "Exchange compliance can affect liquidity and investor confidence", "Possible downside catalyst"]
    };
  }
  if (hasItem("2.02") || form === "10-Q" || form === "10-K") {
    return {
      category: "Earnings / Guidance",
      sentiment: "Watch",
      risk: "Medium",
      headline: form === "10-Q" ? "quarterly financial report filed" : form === "10-K" ? "annual financial report filed" : "financial results or condition update",
      flags: ["Financial results", "Guidance may be inside exhibits", "Market reaction needs confirmation"],
      summary: "Financial results and guidance updates can change forward expectations, but the direction depends on the actual numbers.",
      why: [sourceReason, "Investors often react to guidance and margins", "Needs comparison to expectations"]
    };
  }
  if (hasItem("1.01") || hasItem("1.02")) {
    return {
      category: "Material Agreement",
      sentiment: "Watch",
      risk: "Medium",
      headline: hasItem("1.02") ? "material agreement termination disclosed" : "material agreement disclosed",
      flags: ["Agreement terms may be undisclosed", "Materiality requires context"],
      summary: "Material definitive agreements can move stocks when the deal is large, strategic, or changes the company's business outlook.",
      why: [sourceReason, "Could signal a contract, financing, or partnership", "Needs details from the filing"]
    };
  }
  if (hasItem("2.01") || hasItem("5.01")) {
    return {
      category: "Acquisition / Control",
      sentiment: "Watch",
      risk: "High",
      headline: "acquisition, asset sale, or control change disclosed",
      flags: ["Transaction event", "Terms determine direction", "Potentially high volatility"],
      summary: "A completed acquisition, asset sale, or change in control can reshape the company. Deal value, financing, and dilution determine whether the effect is positive or negative.",
      why: [sourceReason, "The event may change ownership or the value of the business", "Needs transaction terms and market confirmation"]
    };
  }
  if (hasItem("2.03") || hasItem("2.04")) {
    return {
      category: "Financing / Debt",
      sentiment: hasItem("2.04") ? "Negative" : "Watch",
      risk: "High",
      headline: hasItem("2.04") ? "debt triggering event disclosed" : "new financial obligation disclosed",
      flags: ["Debt event", "Cash impact needs review", "Terms determine severity"],
      summary: "A new obligation or debt triggering event can change the company's cash needs and risk profile. The amount and repayment terms matter.",
      why: [sourceReason, "Debt terms can materially change financial risk", "Needs obligation size and market confirmation"]
    };
  }
  if (hasItem("5.02")) {
    return {
      category: "Management Change",
      sentiment: "Watch",
      risk: "Medium",
      headline: "director or executive change disclosed",
      flags: ["Leadership change", "Context matters", "May be routine"],
      summary: "Leadership changes can matter if a key executive resigns, a turnaround CEO joins, or compensation terms reveal incentives.",
      why: [sourceReason, "Can change investor confidence", "Needs reason for departure or appointment"]
    };
  }
  if (hasItem("7.01") || hasItem("8.01")) {
    return {
      category: "Company Update",
      sentiment: "Watch",
      risk: "Medium",
      headline: hasItem("7.01") ? "Regulation FD company update" : "other potentially material event",
      flags: ["Broad disclosure category", "Exhibit may contain the key news", "Read source before acting"],
      summary: "This category can contain press releases and other material updates, but the item number alone does not reveal whether the news is positive or negative.",
      why: [sourceReason, "The attached exhibit may contain new company information", "Direction is unknown until the source is read"]
    };
  }
  return {
    category: "Other Filing",
    sentiment: "Watch",
    risk: "Low",
    headline: `${form} filing needs review`,
    flags: ["Read filing details", "May be routine", "Market reaction needs confirmation"],
    summary: "This is a fresh SEC filing. It may be routine or important depending on the item text and exhibits.",
    why: [sourceReason, "Fresh information reached the market", "Importance and direction are not established"]
  };
}

function formatEt(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", hour12: false }) + " ET";
}

async function loadCatalysts() {
  if (catalystCache.payload && Date.now() - catalystCache.at < 60_000) return attachEvidence(catalystCache.payload);
  const tickerMap = await loadTickerMap();
  const filings = [];
  for (const form of FORMS) {
    const url = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent&type=${encodeURIComponent(form)}&owner=include&count=20&output=atom`;
    const xml = await secFetch(url);
    filings.push(...parseEntries(xml, tickerMap));
  }
  const seen = new Set();
  const catalysts = filings
    .filter(item => item.sourceUrl && !seen.has(item.id) && seen.add(item.id))
    .sort((a, b) => Date.parse(b.updatedIso) - Date.parse(a.updatedIso))
    .slice(0, 80);
  const enriched = await enrichWithQuotes(catalysts);
  const generatedAt = new Date().toISOString();
  updateSignalLedger(enriched.catalysts, generatedAt);
  const payload = {
    mode: ["live", "cached"].includes(enriched.marketData.status) ? "live-sec-quotes" : "live-sec",
    generatedAt,
    count: enriched.catalysts.length,
    marketData: enriched.marketData,
    catalysts: enriched.catalysts
  };
  catalystCache = { at: Date.now(), payload };
  return attachEvidence(payload);
}

async function refreshActiveSignals() {
  if (!FINNHUB_API_KEY || trackerBusy) return;
  const active = Object.values(signalLedger.signals).filter(signal => signal.status === "tracking");
  if (!active.length) return;
  trackerBusy = true;
  try {
    const bySymbol = new Map();
    for (const signal of active) {
      if (!bySymbol.has(signal.symbol)) bySymbol.set(signal.symbol, []);
      bySymbol.get(signal.symbol).push(signal);
    }
    for (const [symbol, signals] of [...bySymbol.entries()].slice(0, 20)) {
      try {
        const quote = await fetchFinnhubQuote(symbol);
        if (quote) {
          for (const signal of signals) {
            signal.dayMove = quote.move;
            addObservation(signal, quote.price, quote.marketDataAt);
          }
        }
      } catch (error) {
        if (error.message.includes("rate limit")) break;
      }
      await new Promise(resolve => setTimeout(resolve, 120));
    }
    saveSignalLedger();
  } finally {
    trackerBusy = false;
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1:4173");
  if (url.pathname === "/health") {
    sendJson(res, 200, { ok: true, service: "catalyst-radar", mode: catalystCache.payload?.mode || "starting" });
    return;
  }
  if (url.pathname === "/api/catalysts") {
    try {
      sendJson(res, 200, await loadCatalysts());
    } catch (error) {
      sendJson(res, 502, { mode: "error", error: error.message, generatedAt: new Date().toISOString(), catalysts: [] });
    }
    return;
  }
  if (url.pathname === "/api/evidence") {
    sendJson(res, 200, evidencePayload());
    return;
  }

  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const file = path.join(root, path.normalize(requested).replace(/^(\.\.[/\\])+/, ""));
  if (!file.startsWith(root)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404).end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
});

if (require.main === module) {
  server.listen(PORT, HOST, () => {
    console.log(`Catalyst Radar running at http://${HOST}:${PORT}`);
    console.log("Live SEC feed enabled. Set SEC_USER_AGENT to your app/contact before production use.");
  });
  const trackingTimer = setInterval(refreshActiveSignals, 65_000);
  trackingTimer.unref();
}

module.exports = { classifyFiling, extractFilingItems, itemReason };
