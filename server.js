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

let catalystCache = { at: 0, payload: null };
let tickerMapCache = { at: 0, map: new Map() };
let quoteCache = { at: 0, map: new Map(), error: null };

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
    const classified = classifyFiling(form, summary);
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
      headline: `${company} filed ${form}`,
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

function classifyFiling(form, summary) {
  const text = `${form} ${summary}`.toLowerCase();
  if (form.startsWith("S-1") || form.startsWith("424B")) {
    return {
      category: "Offering / Dilution",
      sentiment: "Negative",
      risk: "High",
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
      flags: ["Ownership change", "Possible activist interest", "Read filing details"],
      summary: "Ownership filings can matter when a new large holder, activist, or strategic investor appears.",
      why: ["Primary-source ownership filing", "May reveal new investor intent", "Needs issuer and holder context"]
    };
  }
  if (text.includes("item 2.02") || form === "10-Q" || form === "10-K") {
    return {
      category: "Earnings / Guidance",
      sentiment: "Watch",
      risk: "Medium",
      flags: ["Financial results", "Guidance may be inside exhibits", "Market reaction needs confirmation"],
      summary: "Financial results and guidance updates can change forward expectations, but the direction depends on the actual numbers.",
      why: ["Primary-source financial filing", "Investors often react to guidance and margins", "Needs comparison to expectations"]
    };
  }
  if (text.includes("item 1.01")) {
    return {
      category: "Material Agreement",
      sentiment: "Watch",
      risk: "Medium",
      flags: ["Agreement terms may be undisclosed", "Materiality requires context"],
      summary: "Material definitive agreements can move stocks when the deal is large, strategic, or changes the company's business outlook.",
      why: ["Filed as a material agreement", "Could signal a contract, financing, or partnership", "Needs details from the filing"]
    };
  }
  if (text.includes("item 5.02")) {
    return {
      category: "Management Change",
      sentiment: "Watch",
      risk: "Medium",
      flags: ["Leadership change", "Context matters", "May be routine"],
      summary: "Leadership changes can matter if a key executive resigns, a turnaround CEO joins, or compensation terms reveal incentives.",
      why: ["Primary-source governance event", "Can change investor confidence", "Needs reason for departure or appointment"]
    };
  }
  return {
    category: "Other Filing",
    sentiment: "Watch",
    risk: "Low",
    flags: ["Read filing details", "May be routine", "Market reaction needs confirmation"],
    summary: "This is a fresh SEC filing. It may be routine or important depending on the item text and exhibits.",
    why: ["Primary-source SEC update", "Fresh information reached the market", "Needs classification and reaction data"]
  };
}

function formatEt(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", hour12: false }) + " ET";
}

async function loadCatalysts() {
  if (catalystCache.payload && Date.now() - catalystCache.at < 60_000) return catalystCache.payload;
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
  const payload = {
    mode: enriched.marketData.provider && enriched.marketData.status !== "missing-key" ? "live-sec-quotes" : "live-sec",
    generatedAt: new Date().toISOString(),
    count: enriched.catalysts.length,
    marketData: enriched.marketData,
    catalysts: enriched.catalysts
  };
  catalystCache = { at: Date.now(), payload };
  return payload;
}

http.createServer(async (req, res) => {
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
}).listen(PORT, HOST, () => {
  console.log(`Catalyst Radar running at http://${HOST}:${PORT}`);
  console.log("Live SEC feed enabled. Set SEC_USER_AGENT to your app/contact before production use.");
});
