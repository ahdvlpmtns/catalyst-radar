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
let studies = JSON.parse(localStorage.getItem("catalyst-radar-studies") || "[]");

const $ = (id) => document.getElementById(id);
const money = (n) => Number.isFinite(n) ? `$${Number(n).toFixed(2)}` : "—";
const signed = (n, suffix = "%") => Number.isFinite(n) ? `${n > 0 ? "+" : ""}${n.toFixed(1)}${suffix}` : "Pending";
const metric = (n, suffix = "") => Number.isFinite(n) ? `${Number(n).toFixed(1)}${suffix}` : "Pending";

function displayTime(event) {
  if (event.ageMinutes < 1440 || !event.updatedIso) return event.time;
  const date = new Date(event.updatedIso);
  return Number.isNaN(date.getTime()) ? event.time : date.toLocaleDateString([], { month: "short", day: "numeric" });
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
  const events = catalysts.filter(event => matches(event, filters)).sort((a, b) => reactionScore(b) - reactionScore(a));
  $("match-count").textContent = `${events.length} catalyst${events.length === 1 ? "" : "s"}`;
  $("names-in-play").textContent = events.length;
  $("top-catalyst").textContent = events[0]?.symbol || "None";
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
    const score = reactionScore(event);
    return `<tr data-id="${event.id}" class="${selectedId === event.id ? "selected" : ""}">
      <td class="ticker-cell"><strong>${event.symbol}</strong><span>${event.company}</span></td>
      <td><span class="setup-badge">${event.category}</span></td>
      <td>${event.source}</td>
      <td>${displayTime(event)}</td>
      <td class="${event.move >= 0 ? "up" : event.move < 0 ? "down" : ""}">${signed(event.move)}</td>
      <td>${metric(event.volume, "x")}</td>
      <td><span class="risk ${event.risk.toLowerCase().replace(" ", "-")}">${event.risk}</span></td>
      <td><span class="score ${score >= 80 ? "high" : ""}">${score}</span></td>
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
}

function selectEvent(id, rerender = true) {
  selectedId = id;
  if (rerender) renderRadar();
  const event = catalysts.find(item => item.id === id);
  if (!event) return;
  const score = reactionScore(event);
  const watched = watchlist.includes(event.id);
  const existingStudy = studies.find(study => study.id === event.id);
  const canStartStudy = Number.isFinite(event.price) && event.price > 0;
  const studyButtonLabel = existingStudy
    ? existingStudy.status === "open" ? "Paper test in progress" : `Paper test logged: ${outcomeLabel(existingStudy.outcome)}`
    : canStartStudy ? "Start 60-minute paper test" : "Live quote required for paper test";
  $("detail-placeholder").hidden = true;
  $("detail-content").hidden = false;
  $("detail-content").innerHTML = `
    <div class="detail-head">
      <div class="detail-symbol">
        <div><span class="company">${event.company} · ${event.sector}</span><h2>${event.symbol}</h2></div>
        <span class="score ${score >= 80 ? "high" : ""}">${score}</span>
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

      <div class="risk-box">
        <h3>Risk flags</h3>
        <div class="flag-list">${event.flags.map(flag => `<span>${flag}</span>`).join("")}</div>
        <p>${event.history ? `${historicalLabel(event)}. ${event.history.faded}% of similar examples gave back most of the initial move in this sample.` : `${historicalLabel(event)}. Open the SEC filing to read the source document before drawing conclusions.`}</p>
        ${event.sourceUrl ? `<a class="source-link" href="${event.sourceUrl}" target="_blank" rel="noreferrer">Open SEC filing</a>` : ""}
      </div>

      <button class="paper-button" id="watch-button">${watched ? "Remove from watchlist" : "Add to watchlist"}</button>
      <button class="secondary-button" id="note-button">Save research note</button>
      <button class="study-button" id="study-button" ${existingStudy || !canStartStudy ? "disabled" : ""}>${studyButtonLabel}</button>
      <p class="study-button-help">Records a timestamped price snapshot before the result is known. No order is placed.</p>
    </div>`;
  $("watch-button").addEventListener("click", () => toggleWatch(event.id));
  $("note-button").addEventListener("click", () => saveNote(event));
  $("study-button").addEventListener("click", () => startStudy(event));
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
  $("watchlist").innerHTML = watchlist.length ? watchlist.map(id => {
    const event = catalysts.find(item => item.id === id);
    if (!event) return "";
    return `<button class="watch-card" data-id="${event.id}">
      <strong>${event.symbol}</strong>
      <span>${event.category}</span>
      <b class="${event.move >= 0 ? "up" : event.move < 0 ? "down" : ""}">${signed(event.move)}</b>
    </button>`;
  }).join("") : `<div class="journal-empty">Add catalysts here when you want to monitor whether the reaction continues or fades.</div>`;
  document.querySelectorAll(".watch-card").forEach(card => card.addEventListener("click", () => selectEvent(card.dataset.id)));

  $("notes-list").innerHTML = notes.length ? notes.slice(0, 5).map(note => `
    <article class="trade-card">
      <div class="trade-card-head"><strong>${note.symbol}</strong><span>${note.category}</span></div>
      <p>${note.text}</p>
    </article>`).join("") : `<div class="journal-empty">Save notes from catalyst details to build a research history.</div>`;
}

function startStudy(event) {
  if (studies.some(study => study.id === event.id)) {
    toast("This catalyst is already in the study");
    return;
  }
  if (!Number.isFinite(event.price) || event.price <= 0) {
    toast("Connect live quotes before starting a paper test");
    return;
  }

  const direction = event.move < 0 ? "Bearish" : "Bullish";
  const multiplier = direction === "Bullish" ? 1 : -1;
  studies.unshift({
    id: event.id,
    symbol: event.symbol,
    company: event.company,
    category: event.category,
    score: reactionScore(event),
    direction,
    entryPrice: event.price,
    targetPrice: event.price * (1 + multiplier * 0.02),
    stopPrice: event.price * (1 - multiplier * 0.01),
    alertAt: event.updatedIso || new Date().toISOString(),
    startedAt: new Date().toISOString(),
    horizonMinutes: 60,
    status: "open",
    outcome: null,
    rMultiple: null
  });
  saveStudies();
  renderStudy();
  selectEvent(event.id);
  toast("Paper test started. No trade was placed.");
}

function completeStudy(id, outcome) {
  const resultMap = { target: 2, stop: -1, expired: 0 };
  studies = studies.map(study => study.id === id ? {
    ...study,
    status: "completed",
    outcome,
    rMultiple: resultMap[outcome],
    completedAt: new Date().toISOString()
  } : study);
  saveStudies();
  renderStudy();
  if (selectedId === id) selectEvent(id);
  toast(`Paper result logged: ${outcomeLabel(outcome)}`);
}

function outcomeLabel(outcome) {
  return { target: "Target first", stop: "Stop first", expired: "Expired" }[outcome] || "Open";
}

function saveStudies() {
  localStorage.setItem("catalyst-radar-studies", JSON.stringify(studies));
}

function renderStudy() {
  const completed = studies.filter(study => study.status === "completed");
  const wins = completed.filter(study => study.outcome === "target").length;
  const averageR = completed.length
    ? completed.reduce((total, study) => total + study.rMultiple, 0) / completed.length
    : null;
  const remaining = Math.max(0, 100 - completed.length);

  $("study-count").textContent = studies.length;
  $("completed-count").textContent = `${completed.length} / 100`;
  $("win-rate").textContent = completed.length ? `${Math.round((wins / completed.length) * 100)}%` : "Pending";
  $("expectancy").textContent = Number.isFinite(averageR) ? `${averageR >= 0 ? "+" : ""}${averageR.toFixed(2)}R` : "Pending";
  $("study-status").textContent = remaining ? `Need ${remaining} more completed test${remaining === 1 ? "" : "s"}` : "Baseline ready for review";
  $("sample-progress-bar").style.width = `${Math.min(100, completed.length)}%`;
  $("clear-study").disabled = !completed.length;

  $("study-list").innerHTML = studies.length ? studies.slice(0, 12).map(study => {
    const completedClass = study.status === "completed" ? `result-${study.outcome}` : "result-open";
    return `<article class="study-card ${completedClass}">
      <div class="study-card-head">
        <div><strong>${study.symbol}</strong><span>${study.category}</span></div>
        <b>${study.status === "completed" ? outcomeLabel(study.outcome) : "Open"}</b>
      </div>
      <div class="study-card-meta">
        <span>${study.direction}</span><span>Score ${study.score}</span><span>${new Date(study.startedAt).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
      </div>
      <div class="study-prices">
        <div><span>Entry</span><strong>${money(study.entryPrice)}</strong></div>
        <div><span>Target</span><strong>${money(study.targetPrice)}</strong></div>
        <div><span>Stop</span><strong>${money(study.stopPrice)}</strong></div>
      </div>
      ${study.status === "open" ? `<div class="outcome-actions">
        <button class="win" data-study-id="${study.id}" data-outcome="target">Target first (+2R)</button>
        <button class="loss" data-study-id="${study.id}" data-outcome="stop">Stop first (-1R)</button>
        <button data-study-id="${study.id}" data-outcome="expired">Expired (0R)</button>
      </div>` : `<p class="study-result">Recorded result: <strong>${study.rMultiple > 0 ? "+" : ""}${study.rMultiple}R</strong></p>`}
    </article>`;
  }).join("") : `<div class="journal-empty">Select a catalyst with a live quote, then start a paper test. The first 100 completed examples form the baseline sample.</div>`;

  document.querySelectorAll("[data-study-id]").forEach(button => {
    button.addEventListener("click", () => completeStudy(button.dataset.studyId, button.dataset.outcome));
  });
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
      selectedId = catalysts.some(event => event.id === selectedId) ? selectedId : catalysts[0].id;
      const hasQuotes = payload.marketData?.provider && ["live", "cached"].includes(payload.marketData.status);
      $("feed-mode-label").textContent = hasQuotes ? "LIVE SEC + QUOTES" : "LIVE SEC FEED";
      $("data-status").textContent = hasQuotes ? "SEC + Finnhub" : "Live SEC";
      const providerNote = payload.marketData?.status === "missing-key" ? " · quotes need key" : payload.marketData?.error ? " · quote issue" : "";
      $("last-scan").textContent = `${hasQuotes ? "SEC+quotes" : "SEC"} ${new Date(payload.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}${providerNote}`;
      renderRadar();
      renderWatchlist();
      if (showToast) toast(hasQuotes ? `Loaded ${payload.count} filings with quote enrichment` : `Loaded ${payload.count} SEC filings`);
      return;
    }
    throw new Error("No filings returned");
  } catch (error) {
    dataMode = "demo";
    $("feed-mode-label").textContent = "DEMO FALLBACK";
    $("data-status").textContent = "Demo";
    $("last-scan").textContent = "SEC unavailable";
    renderRadar();
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
$("clear-study").addEventListener("click", () => {
  const completedCount = studies.filter(study => study.status === "completed").length;
  if (!completedCount || !window.confirm(`Remove ${completedCount} completed paper test${completedCount === 1 ? "" : "s"}? Open tests will remain.`)) return;
  studies = studies.filter(study => study.status !== "completed");
  saveStudies();
  renderStudy();
  toast("Completed paper tests cleared");
});

updateLabels();
renderRadar();
renderWatchlist();
renderStudy();
updateClock();
setInterval(updateClock, 1000);
loadLiveCatalysts(true);
setInterval(() => loadLiveCatalysts(false), 60000);
