const catalysts = [
  {
    id: "evt-001",
    symbol: "NRGX",
    company: "Norex Genomics",
    sector: "Biotech",
    category: "FDA / Biotech",
    source: "FDA update",
    time: "09:37 ET",
    ageMinutes: 8,
    headline: "FDA grants Fast Track designation to Norex's lead rare-disease candidate",
    summary: "Fast Track can shorten review timelines and usually brings speculative attention to smaller biotech names.",
    price: 3.17,
    move: 71.4,
    volume: 12.1,
    float: 7.8,
    spread: 1.3,
    sentiment: "Positive",
    risk: "High",
    flags: ["Small float", "Halt risk", "Biotech binary event"],
    why: ["Fresh regulatory catalyst", "Price and volume reacting immediately", "Low float can amplify volatility"],
    history: { similar: 42, medianMove: 18.6, faded: 57 },
    watch: false
  },
  {
    id: "evt-002",
    symbol: "BLZE",
    company: "Blaze BioSystems",
    sector: "Biotech",
    category: "Clinical Data",
    source: "Press release",
    time: "09:44 ET",
    ageMinutes: 14,
    headline: "Blaze reports positive interim Phase 2 oncology data",
    summary: "Interim trial data can move biotech stocks sharply, especially when the company has a small float and no prior leak.",
    price: 6.42,
    move: 42.8,
    volume: 8.7,
    float: 12.4,
    spread: 0.6,
    sentiment: "Positive",
    risk: "High",
    flags: ["Trial data", "Prior offering history", "Large opening gap"],
    why: ["Event is directly tied to company value", "Relative volume confirms attention", "Spread is still tradeable in simulation"],
    history: { similar: 31, medianMove: 14.2, faded: 48 },
    watch: false
  },
  {
    id: "evt-003",
    symbol: "QNTM",
    company: "Quantum Mobility",
    sector: "Industrials",
    category: "Contract Win",
    source: "8-K filing",
    time: "10:02 ET",
    ageMinutes: 22,
    headline: "Quantum Mobility signs multi-year autonomous fleet supply agreement",
    summary: "Large customer contracts matter when the deal size is material compared with the company's trailing revenue.",
    price: 11.84,
    move: 18.2,
    volume: 5.4,
    float: 22.1,
    spread: 0.9,
    sentiment: "Positive",
    risk: "Medium",
    flags: ["Contract value undisclosed", "Needs revenue context"],
    why: ["Filed as material agreement", "Price held above premarket high", "Volume is above normal"],
    history: { similar: 58, medianMove: 7.4, faded: 41 },
    watch: false
  },
  {
    id: "evt-004",
    symbol: "ARCV",
    company: "Arcview Robotics",
    sector: "Technology",
    category: "Earnings / Guidance",
    source: "Earnings release",
    time: "08:12 ET",
    ageMinutes: 103,
    headline: "Arcview raises full-year revenue guidance after record bookings",
    summary: "Guidance raises tend to matter more than backward-looking earnings because they change forward expectations.",
    price: 8.09,
    move: 11.6,
    volume: 3.8,
    float: 28.6,
    spread: 1.1,
    sentiment: "Positive",
    risk: "Medium",
    flags: ["Post-earnings volatility", "Needs margin check"],
    why: ["Guidance changed", "Bookings strength supports narrative", "Move is strong but not yet extreme"],
    history: { similar: 73, medianMove: 6.1, faded: 36 },
    watch: false
  },
  {
    id: "evt-005",
    symbol: "MIRA",
    company: "Mirador AI",
    sector: "Technology",
    category: "Social / Rumor",
    source: "Social trend",
    time: "10:18 ET",
    ageMinutes: 11,
    headline: "Mirador AI trends after unverified acquisition chatter",
    summary: "Rumor-driven moves can be explosive but often reverse when there is no confirmed filing or company statement.",
    price: 4.88,
    move: 27.2,
    volume: 6.1,
    float: 18.3,
    spread: 2.2,
    sentiment: "Unverified",
    risk: "Very High",
    flags: ["No primary source", "Wide spread", "Rumor risk"],
    why: ["Market is reacting", "Source quality is weak", "The spread makes execution expensive"],
    history: { similar: 64, medianMove: 9.2, faded: 69 },
    watch: false
  },
  {
    id: "evt-006",
    symbol: "OMNI",
    company: "OmniCell Energy",
    sector: "Energy",
    category: "Offering / Dilution",
    source: "S-1 filing",
    time: "07:51 ET",
    ageMinutes: 124,
    headline: "OmniCell files mixed shelf registration for up to $150M",
    summary: "Shelf registrations can pressure stocks because investors anticipate future dilution, especially when cash is tight.",
    price: 2.64,
    move: -16.8,
    volume: 4.9,
    float: 34.2,
    spread: 1.4,
    sentiment: "Negative",
    risk: "High",
    flags: ["Potential dilution", "Cash runway concern", "Downside catalyst"],
    why: ["Primary filing source", "Price reaction is negative", "Volume confirms investors noticed"],
    history: { similar: 88, medianMove: -8.9, faded: 52 },
    watch: false
  },
  {
    id: "evt-007",
    symbol: "VOLT",
    company: "VoltForge Systems",
    sector: "Industrials",
    category: "Government Award",
    source: "Agency notice",
    time: "10:26 ET",
    ageMinutes: 3,
    headline: "VoltForge named awardee in $92M grid modernization contract",
    summary: "Government contract awards can move smaller industrial names when the award is large relative to annual revenue.",
    price: 14.31,
    move: 9.7,
    volume: 2.9,
    float: 41.5,
    spread: 0.7,
    sentiment: "Positive",
    risk: "Medium",
    flags: ["Award details pending", "Revenue recognition unclear"],
    why: ["Fresh award notice", "Stock is beginning to react", "Move is early compared with other alerts"],
    history: { similar: 49, medianMove: 5.8, faded: 33 },
    watch: false
  },
  {
    id: "evt-008",
    symbol: "STLR",
    company: "Stellar Materials",
    sector: "Materials",
    category: "Analyst Action",
    source: "Analyst note",
    time: "09:05 ET",
    ageMinutes: 41,
    headline: "Stellar upgraded to Buy with price target raised 45%",
    summary: "Analyst upgrades can move stocks, but they are usually weaker catalysts than filings, earnings, or confirmed deals.",
    price: 23.71,
    move: 6.4,
    volume: 2.2,
    float: 61.4,
    spread: 0.4,
    sentiment: "Positive",
    risk: "Low",
    flags: ["Secondary catalyst", "Large float"],
    why: ["Positive revision", "Lower volatility profile", "Reaction is confirmed but moderate"],
    history: { similar: 112, medianMove: 3.1, faded: 29 },
    watch: false
  }
];

const defaults = {
  category: "All",
  minimumMove: 0,
  minimumVolume: 0,
  maxAge: 10080,
  requirePrimary: true,
  hideRumors: false,
  includeNegative: true
};

let selectedId = "evt-001";
let scanning = true;
let soundOn = true;
let dataMode = "demo";
let watchlist = JSON.parse(localStorage.getItem("catalyst-radar-watchlist") || "[]");
let notes = JSON.parse(localStorage.getItem("catalyst-radar-notes") || "[]");
let evidenceSignals = [];
let evidenceProtocol = null;
let evidencePersistence = null;
let marketDataSummary = {};
let evidenceSummary = {
  totalRecorded: 0,
  tracking: 0,
  waiting: 0,
  excluded: 0,
  incomplete: 0,
  completed: 0,
  target: 0,
  stop: 0,
  expired: 0,
  winRate: null,
  averageNetReturn: null,
  paperBalance: 1000,
  paperPnl: 0,
  maxDrawdown: 0,
  evidenceLevel: "collecting"
};
let activeView = "start";

const $ = (id) => document.getElementById(id);
const money = (n) => Number.isFinite(n) ? `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—";
const signed = (n, suffix = "%") => Number.isFinite(n) ? `${n > 0 ? "+" : ""}${n.toFixed(1)}${suffix}` : "Pending";
const metric = (n, suffix = "") => Number.isFinite(n) ? `${Number(n).toFixed(1)}${suffix}` : "Pending";

function displayTime(event) {
  if (event.ageMinutes < 1440 || !event.updatedIso) return event.time;
  const date = new Date(event.updatedIso);
  return Number.isNaN(date.getTime()) ? event.time : date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function beginnerContext(event) {
  const contexts = {
    "Offering / Dilution": {
      label: "Risk alert",
      tone: "danger",
      title: "The company may be issuing more shares.",
      explanation: "More shares can reduce each existing shareholder's ownership percentage and may pressure the stock. The filing terms determine how important it is.",
      next: "Find the offering size, price, and intended use of the cash in the SEC filing."
    },
    "Ownership / Activist": {
      label: "Ownership change",
      tone: "attention",
      title: "A large investor reported a position.",
      explanation: "This can matter when the investor may influence management or believes the company is undervalued. Not every ownership filing is activist activity.",
      next: "Identify the investor, ownership percentage, and stated purpose of the position."
    },
    "Earnings / Guidance": {
      label: "Financial update",
      tone: "positive",
      title: "The company's financial picture changed.",
      explanation: "Revenue, profit, margins, or guidance can reset investor expectations. The direction cannot be known from the form name alone.",
      next: "Compare results and guidance with the prior period and market expectations."
    },
    "Material Agreement": {
      label: "Business event",
      tone: "positive",
      title: "The company disclosed an important agreement.",
      explanation: "The agreement could be a contract, partnership, acquisition, or financing. Its value depends on the actual terms and size relative to the company.",
      next: "Read Item 1.01 and determine who the counterparty is, what changed, and whether dollar terms are disclosed."
    },
    "Acquisition / Control": {
      label: "Major transaction",
      tone: "attention",
      title: "The company disclosed a major ownership or asset change.",
      explanation: "An acquisition, asset sale, or change in control can reshape the company. The price paid, financing, and new share count determine the likely direction.",
      next: "Find the deal value, payment method, closing conditions, and any shares being issued."
    },
    "Financing / Debt": {
      label: "Financial risk",
      tone: "danger",
      title: "The company's debt or cash obligations changed.",
      explanation: "New debt may fund growth or signal a cash need. A default or triggering event is more serious. The amount and repayment terms determine the risk.",
      next: "Find the obligation amount, interest rate, maturity, collateral, and any default language."
    },
    "Accounting Warning": {
      label: "Serious warning",
      tone: "danger",
      title: "Earlier financial statements may not be reliable.",
      explanation: "A non-reliance filing raises uncertainty about numbers investors previously used to value the company and can cause sharp downside volatility.",
      next: "Read which statements are affected, why, and when corrected numbers are expected."
    },
    "Auditor Change": {
      label: "Accounting context",
      tone: "attention",
      title: "The company changed its independent accountant.",
      explanation: "This can be routine or concerning. A disagreement, dismissal, or reportable accounting issue matters more than the change by itself.",
      next: "Read the stated reason and look for any disagreement or reportable event."
    },
    "Listing Risk": {
      label: "Exchange warning",
      tone: "danger",
      title: "The stock may have an exchange compliance problem.",
      explanation: "A listing notice may involve share price, delayed reports, or another exchange rule. The deadline and remediation plan determine the severity.",
      next: "Identify the violated rule, compliance deadline, and the company's proposed remedy."
    },
    "Restructuring / Impairment": {
      label: "Business pressure",
      tone: "danger",
      title: "The company disclosed a restructuring charge or impairment.",
      explanation: "This can signal closures, layoffs, weaker asset values, or a change in the business outlook. The size and explanation determine the impact.",
      next: "Find the dollar amount, affected operation, and management's reason for the charge."
    },
    "Shareholder Vote": {
      label: "Usually routine",
      tone: "neutral",
      title: "The company reported shareholder voting results.",
      explanation: "Most vote-result filings are routine and low priority. They matter when a major transaction passes, a proposal fails, or opposition is unexpectedly strong.",
      next: "Identify the proposals and whether any result was surprising or consequential."
    },
    "Company Update": {
      label: "Source review",
      tone: "attention",
      title: "The company released an update, but direction is not clear yet.",
      explanation: "Items 7.01 and 8.01 can contain important press releases, presentations, or other events. The item code alone cannot tell you whether the news is good or bad.",
      next: "Open the filing exhibit and identify the exact announcement before assigning a direction."
    },
    "Management Change": {
      label: "Leadership update",
      tone: "attention",
      title: "A director or executive role changed.",
      explanation: "Leadership changes can be routine or meaningful. The reason, replacement, and timing matter more than the headline by itself.",
      next: "Check who left or joined, why the change happened, and whether it was planned."
    },
    "Other Filing": {
      label: "Needs context",
      tone: "neutral",
      title: "A new filing arrived, but its importance is not clear yet.",
      explanation: "Many SEC filings are routine. Treat this as a prompt to inspect the document, not as evidence that the stock should move.",
      next: "Open the filing and identify the specific 8-K item or exhibit before spending more time on it."
    }
  };
  return contexts[event.category] || {
    label: "Research next",
    tone: "attention",
    title: "New information may be affecting the company.",
    explanation: event.summary,
    next: "Confirm the original source, then check whether price and volume reacted after the event."
  };
}

function setView(view, scroll = true) {
  activeView = ["start", "radar", "research"].includes(view) ? view : "start";
  document.querySelectorAll(".app-view").forEach(panel => {
    panel.hidden = panel.id !== `view-${activeView}`;
  });
  document.querySelectorAll(".nav-tab").forEach(button => {
    button.classList.toggle("active", button.dataset.view === activeView);
  });
  document.body.dataset.view = activeView;
  if (scroll) {
    const marketStrip = document.querySelector(".market-strip");
    const margin = Number.parseFloat(window.getComputedStyle(marketStrip).marginBottom) || 0;
    const navigationTop = marketStrip.offsetTop + marketStrip.offsetHeight + margin;
    window.scrollTo({ top: Math.max(0, navigationTop - 64), behavior: "smooth" });
  }
}

function fallbackEvidence(event) {
  if (!primarySource(event)) {
    return { status: "excluded", reason: "This demo item does not have the primary source required by the fixed baseline." };
  }
  if (event.category === "Offering / Dilution") {
    return { status: "excluded", reason: "Offering or dilution filings are excluded from the bullish baseline." };
  }
  if (event.ageMinutes > 30) {
    return { status: "excluded", reason: "The filing is outside the fixed 30-minute freshness window." };
  }
  if (!Number.isFinite(event.price)) {
    return { status: "waiting", reason: "A current quote is required before automatic tracking can begin." };
  }
  if (!Number.isFinite(event.move) || event.move < 2) {
    return { status: "waiting", reason: "Current-day price activity has not reached the fixed +2% threshold." };
  }
  return { status: "tracking", reason: "Fresh filing and the fixed price-activity gate both passed." };
}

function evidenceFor(event) {
  return event.evidence || evidenceSignals.find(signal => signal.id === event.id) || fallbackEvidence(event);
}

function evidenceMeta(status) {
  const states = {
    tracking: { label: "Confirmed activity", tone: "confirmed", bucket: "confirmed" },
    target: { label: "Target recorded", tone: "target", bucket: "confirmed" },
    stop: { label: "Stop recorded", tone: "stop", bucket: "confirmed" },
    expired: { label: "Expired", tone: "expired", bucket: "confirmed" },
    incomplete: { label: "Incomplete data", tone: "incomplete", bucket: "excluded" },
    excluded: { label: "Excluded from test", tone: "excluded", bucket: "excluded" },
    waiting: { label: "Waiting", tone: "waiting", bucket: "waiting" }
  };
  return states[status] || states.waiting;
}

const CATEGORY_ATTENTION = Object.freeze({
  "Accounting Warning": 30,
  "Listing Risk": 28,
  "Restructuring / Impairment": 28,
  "Offering / Dilution": 27,
  "Acquisition / Control": 27,
  "Earnings / Guidance": 25,
  "Financing / Debt": 24,
  "Material Agreement": 23,
  "Ownership / Activist": 20,
  "Company Update": 16,
  "Auditor Change": 15,
  "Management Change": 14,
  "Shareholder Vote": 3,
  "Other Filing": 4
});

function shortAge(event) {
  if (event.ageMinutes < 60) return `${event.ageMinutes} minutes ago`;
  if (event.ageMinutes < 1440) return `${Math.floor(event.ageMinutes / 60)} hours ago`;
  return `${Math.floor(event.ageMinutes / 1440)} days ago`;
}

function marketSession() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());
  const value = type => parts.find(part => part.type === type)?.value;
  const weekday = value("weekday");
  const minutes = Number(value("hour")) * 60 + Number(value("minute"));
  if (["Sat", "Sun"].includes(weekday)) return "closed";
  if (minutes >= 240 && minutes < 570) return "premarket";
  if (minutes >= 570 && minutes < 960) return "open";
  return "closed";
}

function quoteState(event) {
  if (!event.live) return { usable: Number.isFinite(event.move), label: "Demo quote" };
  const quoteTime = Date.parse(event.marketDataAt);
  const filingTime = Date.parse(event.updatedIso);
  const ageMinutes = Number.isFinite(quoteTime) ? Math.max(0, (Date.now() - quoteTime) / 60000) : null;
  const current = event.quoteStatus ? event.quoteStatus === "current" : ageMinutes !== null && ageMinutes <= 20;
  const afterCatalyst = typeof event.quoteAfterCatalyst === "boolean"
    ? event.quoteAfterCatalyst
    : Number.isFinite(quoteTime) && Number.isFinite(filingTime) && quoteTime >= filingTime;
  if (!Number.isFinite(event.move) || !Number.isFinite(quoteTime)) return { usable: false, label: "Quote pending" };
  if (!current) return { usable: false, label: "Stale quote", ageMinutes };
  if (!afterCatalyst) return { usable: false, label: "Before catalyst", ageMinutes };
  return { usable: true, label: "Current quote", ageMinutes };
}

function commonStockCandidate(event) {
  const likelyDerivative = event.symbol.length >= 5 && /(WS|W|U|R)$/.test(event.symbol);
  return event.sector !== "OTC" && !likelyDerivative;
}

function attentionFor(event) {
  const evidence = evidenceFor(event);
  const context = beginnerContext(event);
  const quote = quoteState(event);
  const absoluteMove = quote.usable ? Math.abs(event.move) : 0;
  let points = CATEGORY_ATTENTION[event.category] ?? 10;
  points += primarySource(event) ? 10 : -18;
  points += event.ageMinutes <= 30 ? 28 : event.ageMinutes <= 240 ? 16 : event.ageMinutes <= 1440 ? 7 : -8;
  points += absoluteMove >= 5 ? 24 : absoluteMove >= 2 ? 17 : absoluteMove > 0 ? 7 : 0;
  if (evidence.status === "tracking") points += 10;
  if (event.category === "Other Filing") points -= 12;
  if (event.category === "Shareholder Vote") points -= 12;
  if (!commonStockCandidate(event)) points -= 30;

  const level = points >= 65 ? "watch" : points >= 39 ? "keep" : "low";
  const meta = {
    watch: { label: "Watch closely", tone: "watch" },
    keep: { label: "Keep an eye on", tone: "keep" },
    low: { label: "Low priority", tone: "low" }
  }[level];
  const downsideCategory = ["Offering / Dilution", "Accounting Warning", "Listing Risk", "Restructuring / Impairment"].includes(event.category);
  const direction = downsideCategory || (quote.usable && event.move <= -2)
    ? "Possible downside"
    : quote.usable && event.move >= 2 ? "Upside activity" : "Direction unclear";
  const reasons = [
    `A primary-source ${event.source} filing arrived ${shortAge(event)}.`,
    ...event.why.slice(0, 2)
  ];
  if (quote.usable) reasons.push(`A current post-catalyst quote shows a ${signed(event.move)} day move.`);
  if (quote.label === "Stale quote") reasons.push("Finnhub returned an old quote, so its percentage move is not counted.");
  if (quote.label === "Before catalyst") reasons.push("The available quote predates the filing, so it does not confirm a reaction.");
  const missing = [];
  if (event.category === "Other Filing") missing.push("the actual event inside the filing");
  if (!quote.usable) missing.push("fresh post-catalyst price confirmation");
  if (!Number.isFinite(event.volume)) missing.push("relative volume");
  if (!Number.isFinite(event.spread)) missing.push("bid/ask spread");
  if (!commonStockCandidate(event)) missing.push("ordinary exchange-listed common-stock eligibility");

  const session = marketSession();
  const action = level === "low"
    ? "No action now. Check the source only if you want more context."
    : session === "premarket"
      ? "At the open: watch whether price and volume confirm the story. Do not act from the filing alone."
      : session === "open"
        ? "Market is open: watch whether activity continues with adequate volume and liquidity."
        : "At the next open: watch for price and volume confirmation before considering a paper trade.";
  return { ...meta, level, points, direction, context, reasons, missing, action, quote };
}

function renderEvidenceBoard() {
  const unique = new Set();
  const current = [...catalysts]
    .filter(event => !unique.has(event.symbol) && unique.add(event.symbol))
    .map(event => ({ event, attention: attentionFor(event) }))
    .sort((a, b) => b.attention.points - a.attention.points || a.event.ageMinutes - b.event.ageMinutes);
  const counts = current.reduce((total, item) => {
    total[item.attention.level] += 1;
    return total;
  }, { watch: 0, keep: 0, low: 0 });

  $("watch-closely-count").textContent = counts.watch;
  $("keep-eye-count").textContent = counts.keep;
  $("low-priority-count").textContent = counts.low;
  $("nav-radar-count").textContent = catalysts.length;
  const answer = dataMode === "demo"
    ? "The live connection is unavailable, so these are examples only. Do not use demo names to make a real decision."
    : counts.watch
      ? `${counts.watch} ${counts.watch === 1 ? "stock has" : "stocks have"} a fresh, specific catalyst with the strongest available evidence. Start there, then verify the source.`
      : counts.keep
        ? `Nothing has strong confirmation yet. ${counts.keep} ${counts.keep === 1 ? "name is" : "names are"} worth monitoring while you wait for better evidence.`
        : "There is no strong watch candidate right now. Doing nothing is a valid result.";
  $("morning-answer").textContent = answer;
  $("watch-session").textContent = marketSession() === "premarket"
    ? "Premarket view: these are names to monitor when regular trading opens."
    : marketSession() === "open"
      ? "Market-hours view: confirm that activity is real and liquid before considering a paper test."
      : "Market is closed: prepare this list for the next regular session.";
  const freshQuotes = Number.isFinite(marketDataSummary.freshQuotes)
    ? marketDataSummary.freshQuotes
    : new Set(catalysts.filter(event => quoteState(event).usable).map(event => event.symbol)).size;
  const staleQuotes = Number.isFinite(marketDataSummary.staleQuotes)
    ? marketDataSummary.staleQuotes
    : new Set(catalysts.filter(event => quoteState(event).label === "Stale quote").map(event => event.symbol)).size;
  $("live-data-note").textContent = dataMode === "demo"
    ? "DEMO MODE: the names below are examples, not live candidates."
    : `${freshQuotes} fresh quotes connected${staleQuotes ? ` · ${staleQuotes} stale ${staleQuotes === 1 ? "quote was" : "quotes were"} rejected` : ""} · Relative volume and bid/ask spread are not connected yet.`;

  $("morning-list").innerHTML = current.length ? current.slice(0, 8).map(({ event, attention }, index) => `
    <article class="morning-card tone-${attention.tone}">
      <div class="morning-card-top">
        <span class="attention-label ${attention.tone}">${attention.label}</span>
        <span class="morning-rank">#${index + 1} for attention</span>
      </div>
      <div class="morning-symbol-row">
        <div><strong>${event.symbol}</strong><span>${event.company}</span></div>
        <div class="morning-move"><b class="${attention.quote.usable && event.move >= 0 ? "up" : attention.quote.usable && event.move < 0 ? "down" : ""}">${attention.quote.usable ? signed(event.move) : attention.quote.label}</b><small>${attention.direction}</small></div>
      </div>
      <span class="morning-category">${event.category} · ${event.source}</span>
      <h3>${attention.context.title}</h3>
      <p class="morning-headline">${event.headline}</p>
      <div class="reason-list">
        <span>Why it is here</span>
        ${attention.reasons.map(reason => `<p><i></i>${reason}</p>`).join("")}
      </div>
      <p class="missing-data"><b>Still missing:</b> ${attention.missing.length ? attention.missing.join(", ") : "no major field in the current rules"}.</p>
      <div class="open-action"><span>What you do next</span><strong>${attention.action}</strong></div>
      <button class="morning-detail-button" data-explain-id="${event.id}">Show me the details</button>
    </article>`).join("") : `<div class="evidence-empty">No recent filings are available. The app will keep checking automatically.</div>`;

  document.querySelectorAll("[data-explain-id]").forEach(button => {
    button.addEventListener("click", () => {
      selectedId = button.dataset.explainId;
      setView("radar");
      renderRadar();
      selectEvent(selectedId);
    });
  });
}

function getFilters() {
  return {
    category: $("category-filter").value,
    minimumMove: +$("min-move").value,
    minimumVolume: +$("min-volume").value,
    maxAge: +$("max-age").value,
    requirePrimary: $("require-primary").checked,
    hideRumors: $("hide-rumors").checked,
    includeNegative: $("include-negative").checked
  };
}

function primarySource(event) {
  return !["Social trend", "Analyst note"].includes(event.source);
}

function reactionScore(event) {
  const source = primarySource(event) ? 20 : 8;
  const freshness = Math.max(4, 20 - event.ageMinutes / 9);
  const price = Number.isFinite(event.move) ? Math.min(25, Math.abs(event.move) * 1.2) : 0;
  const volume = Number.isFinite(event.volume) ? Math.min(20, event.volume * 2.3) : 0;
  const execution = Number.isFinite(event.spread) ? Math.max(2, 15 - event.spread * 4) : 6;
  const filingWeight = event.live ? 12 : 0;
  return Math.round(Math.min(99, source + freshness + price + volume + execution + filingWeight));
}

function historicalLabel(event) {
  if (!event.history) return "Historical reaction testing is not connected yet";
  if (event.history.medianMove > 10) return "Strong historical reaction";
  if (event.history.medianMove < -5) return "Historically negative";
  if (event.history.faded > 60) return "Often fades";
  return "Moderate historical reaction";
}

function matches(event, f) {
  return (f.category === "All" || event.category === f.category) &&
    (f.minimumMove === 0 || (Number.isFinite(event.move) && Math.abs(event.move) >= f.minimumMove)) &&
    (f.minimumVolume === 0 || (Number.isFinite(event.volume) && event.volume >= f.minimumVolume)) &&
    event.ageMinutes <= f.maxAge &&
    (!f.requirePrimary || primarySource(event)) &&
    (!f.hideRumors || event.sentiment !== "Unverified") &&
    (f.includeNegative || !Number.isFinite(event.move) || event.move > 0);
}

function renderRadar() {
  const filters = getFilters();
  const statusOrder = { tracking: 0, target: 1, stop: 1, expired: 1, waiting: 2, incomplete: 3, excluded: 4 };
  const events = catalysts.filter(event => matches(event, filters)).sort((a, b) => {
    const statusDifference = (statusOrder[evidenceFor(a).status] ?? 5) - (statusOrder[evidenceFor(b).status] ?? 5);
    return statusDifference || a.ageMinutes - b.ageMinutes;
  });
  $("match-count").textContent = `${events.length} catalyst${events.length === 1 ? "" : "s"}`;
  $("names-in-play").textContent = evidenceSummary.tracking || catalysts.filter(event => evidenceFor(event).status === "tracking").length;
  $("top-catalyst").textContent = evidenceSummary.completed;
  $("urgent-count").textContent = catalysts.filter(event => event.ageMinutes <= 30).length;
  $("empty-state").hidden = events.length > 0;
  $("show-recent").hidden = events.length > 0 || filters.maxAge >= 10080;
  if (!events.length) {
    $("empty-title").textContent = catalysts.length ? "No catalyst matches this view." : "Waiting for the first filing.";
    $("empty-copy").textContent = filters.maxAge < 10080
      ? "The live feed is connected. Widen the review window to include recent filing days."
      : "Try resetting the filters. SEC activity is often quiet on weekends and market holidays.";
  }
  $("radar-body").innerHTML = events.map(event => {
    const evidence = evidenceFor(event);
    const status = evidenceMeta(evidence.status);
    const age = event.ageMinutes < 60 ? `${event.ageMinutes}m` : event.ageMinutes < 1440 ? `${Math.floor(event.ageMinutes / 60)}h` : `${Math.floor(event.ageMinutes / 1440)}d`;
    return `<tr data-id="${event.id}" class="${selectedId === event.id ? "selected" : ""}">
      <td class="ticker-cell"><strong>${event.symbol}</strong><span>${event.company}</span></td>
      <td><span class="evidence-status ${status.tone}">${status.label}</span></td>
      <td><span class="setup-badge">${event.category}</span></td>
      <td>${event.source}</td>
      <td>${displayTime(event)}</td>
      <td class="${event.move >= 0 ? "up" : event.move < 0 ? "down" : ""}">${signed(event.move)}</td>
      <td><span class="risk ${event.risk.toLowerCase().replace(" ", "-")}">${event.risk}</span></td>
      <td>${age}</td>
    </tr>`;
  }).join("");

  document.querySelectorAll("#radar-body tr").forEach(row => {
    row.addEventListener("click", () => selectEvent(row.dataset.id));
  });

  if (selectedId && !events.some(event => event.id === selectedId)) {
    selectedId = events[0]?.id || null;
  }
  if (selectedId) selectEvent(selectedId, false);
  if (!selectedId) {
    $("detail-content").hidden = true;
    $("detail-placeholder").hidden = false;
  }
  renderEvidenceBoard();
}

function selectEvent(id, rerender = true) {
  selectedId = id;
  if (rerender) renderRadar();
  const event = catalysts.find(item => item.id === id);
  if (!event) return;
  const context = beginnerContext(event);
  const evidence = evidenceFor(event);
  const status = evidenceMeta(evidence.status);
  const watched = watchlist.includes(event.id);
  const catalystSignal = event.category === "Other Filing" ? "Needs review" : event.category === "Offering / Dilution" ? "Dilution risk" : "Relevant filing";
  const momentumSignal = evidence.status === "tracking" ? "Activity confirmed" : Number.isFinite(event.move) ? signed(event.move) : "Quote pending";
  $("detail-placeholder").hidden = true;
  $("detail-content").hidden = false;
  $("detail-content").innerHTML = `
    <div class="detail-head">
      <div class="detail-symbol">
        <div><span class="company">${event.company} · ${event.sector}</span><h2>${event.symbol}</h2></div>
        <span class="evidence-status detail-status ${status.tone}">${status.label}</span>
      </div>
      <div class="detail-price"><strong>${money(event.price)}</strong><span class="${event.move >= 0 ? "up" : event.move < 0 ? "down" : ""}">${signed(event.move)}</span></div>
      <div class="quote-source">${event.marketDataProvider ? `Current quote via ${event.marketDataProvider}` : "Quote data pending"}</div>
    </div>
    <div class="detail-body">
      <h3>What happened</h3>
      <div class="news-card">
        <span>${event.category.toUpperCase()} · ${event.source.toUpperCase()} · ${event.filedDate || displayTime(event)}</span>
        <p><strong>${event.headline}</strong></p>
        <p>${event.summary}</p>
      </div>

      <div class="beginner-translation ${context.tone}">
        <span>BEGINNER TRANSLATION · ${context.label.toUpperCase()}</span>
        <h3>${context.title}</h3>
        <p>${context.explanation}</p>
      </div>

      <div class="signal-verdict">
        <div><span>Catalyst</span><strong>${catalystSignal}</strong></div>
        <div><span>Price activity</span><strong>${momentumSignal}</strong></div>
        <div><span>Risk</span><strong>${event.risk}</strong></div>
        <p><b>${status.label}:</b> ${evidence.reason}</p>
      </div>

      <div class="score-breakdown">
        <h3>Why it may matter</h3>
        ${event.why.map(item => `<div class="why-row"><i></i><span>${item}</span></div>`).join("")}
      </div>

      <div class="trade-plan">
        <h3>Reaction snapshot</h3>
        <div class="plan-grid">
          <div><span>Current day move</span><strong class="${event.move >= 0 ? "up" : event.move < 0 ? "down" : ""}">${signed(event.move)}</strong></div>
          <div><span>Relative volume</span><strong>${metric(event.volume, "x")}</strong></div>
          <div><span>Float</span><strong>${metric(event.float, "M")}</strong></div>
          <div><span>Spread</span><strong>${metric(event.spread, "%")}</strong></div>
          <div><span>Similar events</span><strong>${event.history?.similar || "Pending"}</strong></div>
          <div><span>Median move</span><strong>${event.history ? signed(event.history.medianMove) : "Pending"}</strong></div>
        </div>
      </div>

      <div class="next-checks">
        <h3>What to check next</h3>
        <div><b>1</b><span><strong>Read the original source</strong>${context.next}</span></div>
        <div><b>2</b><span><strong>Confirm the market response</strong>${Number.isFinite(event.move) ? `The current day move is ${signed(event.move)}, but that does not prove this filing caused it.` : "Quote context is still pending, so do not assume the market reacted."}</span></div>
        <div><b>3</b><span><strong>Let the fixed rule collect evidence</strong>Eligible signals are tracked automatically. You never choose the result after seeing what happened.</span></div>
      </div>

      <div class="risk-box">
        <h3>Risk flags</h3>
        <div class="flag-list">${event.flags.map(flag => `<span>${flag}</span>`).join("")}</div>
        <p>${event.history ? `${historicalLabel(event)}. ${event.history.faded}% of similar examples gave back most of the initial move in this sample.` : `${historicalLabel(event)}. Open the SEC filing to read the source document before drawing conclusions.`}</p>
        ${event.sourceUrl ? `<a class="source-link" href="${event.sourceUrl}" target="_blank" rel="noreferrer">Open SEC filing</a>` : ""}
      </div>

      <button class="paper-button" id="watch-button">${watched ? "Remove from watchlist" : "Add to watchlist"}</button>
      <button class="secondary-button" id="note-button">Save research note</button>
      <button class="study-button" id="results-button">View automatic results</button>
      <p class="study-button-help">Quote-snapshot results are educational evidence, not trade instructions or minute-bar verification.</p>
    </div>`;
  $("watch-button").addEventListener("click", () => toggleWatch(event.id));
  $("note-button").addEventListener("click", () => saveNote(event));
  $("results-button").addEventListener("click", () => setView("research"));
}

function toggleWatch(id) {
  watchlist = watchlist.includes(id) ? watchlist.filter(item => item !== id) : [id, ...watchlist];
  localStorage.setItem("catalyst-radar-watchlist", JSON.stringify(watchlist));
  renderWatchlist();
  selectEvent(id);
  toast(watchlist.includes(id) ? "Added to watchlist" : "Removed from watchlist");
}

function saveNote(event) {
  notes.unshift({
    id: Date.now(),
    symbol: event.symbol,
    category: event.category,
    text: `${event.headline} Reaction ${signed(event.move)}, RVOL ${metric(event.volume, "x")}. Next check: did market data confirm the filing mattered?`
  });
  localStorage.setItem("catalyst-radar-notes", JSON.stringify(notes));
  renderWatchlist();
  toast("Research note saved");
}

function renderWatchlist() {
  $("watch-count").textContent = watchlist.length;
  $("watch-count-duplicate").textContent = watchlist.length;
  $("note-count").textContent = notes.length;
  $("nav-research-count").textContent = evidenceSummary.completed;
  $("watchlist").innerHTML = watchlist.length ? watchlist.map(id => {
    const event = catalysts.find(item => item.id === id);
    if (!event) return "";
    return `<button class="watch-card" data-id="${event.id}">
      <strong>${event.symbol}</strong>
      <span>${event.category}</span>
      <b class="${event.move >= 0 ? "up" : event.move < 0 ? "down" : ""}">${signed(event.move)}</b>
    </button>`;
  }).join("") : `<div class="journal-empty">Add catalysts here when you want to monitor whether the reaction continues or fades.</div>`;
  document.querySelectorAll(".watch-card").forEach(card => card.addEventListener("click", () => {
    setView("radar");
    selectEvent(card.dataset.id);
  }));

  $("notes-list").innerHTML = notes.length ? notes.slice(0, 5).map(note => `
    <article class="trade-card">
      <div class="trade-card-head"><strong>${note.symbol}</strong><span>${note.category}</span></div>
      <p>${note.text}</p>
    </article>`).join("") : `<div class="journal-empty">Save notes from catalyst details to build a research history.</div>`;
}

function renderResults() {
  const remaining = Math.max(0, 100 - evidenceSummary.completed);
  const pnlPrefix = evidenceSummary.paperPnl > 0 ? "+" : evidenceSummary.paperPnl < 0 ? "-" : "";
  const pnlAmount = Math.abs(evidenceSummary.paperPnl).toFixed(2);
  const evidenceLabels = {
    collecting: remaining ? `Need ${remaining} more completed tests` : "Collecting evidence",
    preliminary: "Preliminary sample",
    interesting: "Interesting sample",
    "larger sample": "Larger sample"
  };

  $("study-count").textContent = evidenceSummary.totalRecorded;
  $("tracking-count").textContent = evidenceSummary.tracking;
  $("completed-count").textContent = `${evidenceSummary.completed} / 100`;
  $("win-rate").textContent = Number.isFinite(evidenceSummary.winRate) ? `${evidenceSummary.winRate.toFixed(1)}%` : "Pending";
  $("study-status").textContent = evidenceLabels[evidenceSummary.evidenceLevel] || "Collecting evidence";
  $("sample-progress-bar").style.width = `${Math.min(100, evidenceSummary.completed)}%`;
  $("nav-research-count").textContent = evidenceSummary.completed;
  $("paper-balance").textContent = money(evidenceSummary.paperBalance);
  $("paper-pnl").textContent = `${pnlPrefix}$${pnlAmount}`;
  $("paper-pnl").className = evidenceSummary.paperPnl > 0 ? "up" : evidenceSummary.paperPnl < 0 ? "down" : "";
  $("average-result").textContent = Number.isFinite(evidenceSummary.averageNetReturn) ? signed(evidenceSummary.averageNetReturn) : "Pending";
  $("max-drawdown").textContent = evidenceSummary.maxDrawdown < 0 ? `-$${Math.abs(evidenceSummary.maxDrawdown).toFixed(2)}` : "$0.00";
  $("target-count").textContent = evidenceSummary.target;
  $("stop-count").textContent = evidenceSummary.stop;
  $("expired-count").textContent = evidenceSummary.expired;
  $("incomplete-count").textContent = evidenceSummary.incomplete;
  $("data-quality-banner").textContent = evidencePersistence?.warning
    ? `Quote-snapshot testing only. ${evidencePersistence.warning}`
    : "Quote-snapshot testing only. Minute-bar verification and durable cloud storage are not connected yet.";

  const automaticSignals = evidenceSignals.filter(signal => signal.startedAt || signal.status === "incomplete");
  $("study-list").innerHTML = automaticSignals.length ? automaticSignals.slice(0, 20).map(signal => {
    const meta = evidenceMeta(signal.status);
    const started = signal.startedAt ? new Date(signal.startedAt).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Not started";
    const result = Number.isFinite(signal.resultReturnPercent) ? signed(signal.resultReturnPercent) : signal.status === "tracking" ? "Tracking" : "Not counted";
    return `<article class="study-card result-${signal.status}">
      <div class="study-card-head">
        <div><strong>${signal.symbol}</strong><span>${signal.category}</span></div>
        <b class="evidence-status ${meta.tone}">${meta.label}</b>
      </div>
      <div class="study-card-meta"><span>Bullish baseline</span><span>${signal.observationCount || 0} snapshots</span><span>${started}</span></div>
      <div class="study-prices">
        <div><span>Entry</span><strong>${money(signal.alertPrice)}</strong></div>
        <div><span>Target</span><strong>${money(signal.targetPrice)}</strong></div>
        <div><span>Stop</span><strong>${money(signal.stopPrice)}</strong></div>
      </div>
      <div class="study-evidence-row"><span>Max up <b>${signed(signal.maxGainPercent)}</b></span><span>Max down <b>${signed(signal.maxLossPercent)}</b></span><span>Result <b>${result}</b></span></div>
      <p class="study-result">${signal.reason}</p>
    </article>`;
  }).join("") : `<div class="journal-empty">No signal has passed every fixed eligibility gate yet. Waiting and excluded filings are still recorded by the server.</div>`;
}

function updateLabels() {
  const f = getFilters();
  $("move-value").textContent = `${f.minimumMove}%`;
  $("volume-value").textContent = `${f.minimumVolume.toFixed(1)}x`;
}

function resetFilters() {
  $("category-filter").value = defaults.category;
  $("min-move").value = defaults.minimumMove;
  $("min-volume").value = defaults.minimumVolume;
  $("max-age").value = defaults.maxAge;
  $("require-primary").checked = defaults.requirePrimary;
  $("hide-rumors").checked = defaults.hideRumors;
  $("include-negative").checked = defaults.includeNegative;
  updateLabels();
  renderRadar();
}

async function loadLiveCatalysts(showToast = false) {
  if (!scanning) return;
  try {
    $("last-scan").textContent = "Checking SEC...";
    const response = await fetch("/api/catalysts", { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Live feed failed");
    if (payload.catalysts?.length) {
      catalysts.splice(0, catalysts.length, ...payload.catalysts);
      dataMode = payload.mode;
      marketDataSummary = payload.marketData || {};
      evidenceSignals = payload.evidence?.signals || [];
      evidenceProtocol = payload.evidence?.protocol || null;
      evidencePersistence = payload.evidence?.persistence || null;
      evidenceSummary = { ...evidenceSummary, ...(payload.evidence?.summary || {}) };
      selectedId = catalysts.some(event => event.id === selectedId) ? selectedId : catalysts[0].id;
      const hasQuotes = payload.marketData?.provider && ["live", "cached"].includes(payload.marketData.status);
      $("feed-mode-label").textContent = hasQuotes ? "LIVE SEC + QUOTES" : "LIVE SEC FEED";
      $("data-status").textContent = hasQuotes ? "SEC + Finnhub" : "Live SEC";
      const freshQuotes = Number.isFinite(payload.marketData?.freshQuotes) ? payload.marketData.freshQuotes : payload.marketData?.enrichedSymbols || 0;
      $("feed-health").textContent = hasQuotes ? `${freshQuotes} fresh quotes` : "SEC only";
      const providerNote = payload.marketData?.status === "missing-key" ? " · quotes need key" : payload.marketData?.error ? " · quote issue" : "";
      $("last-scan").textContent = `${hasQuotes ? "SEC+quotes" : "SEC"} ${new Date(payload.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}${providerNote}`;
      renderRadar();
      renderWatchlist();
      renderResults();
      if (showToast) toast(hasQuotes ? `Loaded ${payload.count} filings with quote enrichment` : `Loaded ${payload.count} SEC filings`);
      return;
    }
    throw new Error("No filings returned");
  } catch (error) {
    dataMode = "demo";
    marketDataSummary = {};
    $("feed-mode-label").textContent = "DEMO FALLBACK";
    $("data-status").textContent = "Demo";
    $("feed-health").textContent = "Demo fallback";
    $("last-scan").textContent = "SEC unavailable";
    renderRadar();
    renderResults();
    if (showToast) toast(error.message);
  }
}

function toast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("show");
  setTimeout(() => $("toast").classList.remove("show"), 2200);
}

function updateClock() {
  const now = new Date();
  $("market-clock").textContent = now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour12: false }) + " ET";
}

document.querySelectorAll("input, select").forEach(input => input.addEventListener("input", () => {
  updateLabels();
  renderRadar();
}));
document.querySelectorAll(".nav-tab").forEach(button => {
  button.addEventListener("click", () => setView(button.dataset.view));
});
$("open-radar-guide").addEventListener("click", () => setView("radar"));
$("view-all-radar").addEventListener("click", () => setView("radar"));
document.querySelector(".brand").addEventListener("click", event => {
  event.preventDefault();
  setView("start");
});
$("reset-filters").addEventListener("click", resetFilters);
$("show-recent").addEventListener("click", () => {
  $("max-age").value = "10080";
  updateLabels();
  renderRadar();
});
$("scan-toggle").addEventListener("click", () => {
  scanning = !scanning;
  $("scan-toggle").textContent = scanning ? "Pause feed" : "Resume feed";
  toast(scanning ? "Feed resumed" : "Feed paused");
  if (scanning) loadLiveCatalysts(false);
});
$("sound-toggle").addEventListener("click", () => {
  soundOn = !soundOn;
  $("sound-toggle").textContent = soundOn ? "Alerts on" : "Alerts off";
});
setView("start", false);
updateLabels();
renderRadar();
renderWatchlist();
renderResults();
updateClock();
setInterval(updateClock, 1000);
loadLiveCatalysts(true);
setInterval(() => loadLiveCatalysts(false), 60000);
