# Catalyst Radar

A dependency-free prototype for tracking stock-moving catalysts: news, filings, guidance changes, FDA events, offerings, contracts, rumors, and other events that can move prices.

## Run

```bash
/Users/andres/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node server.js
```

Then open `http://localhost:4173`.

SEC filing alerts are fetched live through the local server with a declared User-Agent and a short cache. Quote enrichment is supported through Finnhub when `FINNHUB_API_KEY` is set. Historical stats and deeper volume analytics are still pending a fuller market-data provider. The feed, filters, catalyst detail view, watchlist, notes, signal study, polling, and local persistence are functional.

## Optional quote enrichment

```bash
SEC_USER_AGENT="CatalystRadar/0.1 your-email@example.com" \
FINNHUB_API_KEY="your_finnhub_key" \
/Users/andres/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node server.js
```

Without `FINNHUB_API_KEY`, the app still runs as a live SEC filing radar and leaves price reaction fields marked `Pending`.

## Signal study

The app does not treat its Mover Score as a proven trading signal. A catalyst with a live quote can be added to a fixed paper-test protocol:

- Snapshot the alert price, score, direction, and time before recording the result
- Use a 2% directional target, 1% stop, and 60-minute maximum horizon
- Record whether the target or stop happened first, or whether the test expired
- Review win rate and average result in R after at least 100 completed examples

Study records currently live in that browser's local storage. The result buttons are a manual research tool, not automatic market verification. A production version should store candidates centrally and label outcomes from timestamped historical bars so results cannot be selected with hindsight.

## Product direction

The next milestones are expanding the live data and making validation automatic:

- SEC EDGAR filings for primary-source filing alerts
- Nasdaq halt RSS for halt/resume events
- A paid market data/news API for prices, relative volume, broader news, and historical reaction testing
- Server-side storage for every candidate and its original feature snapshot
- Automatic target/stop/expiration labels from one-minute historical bars
- Score calibration by catalyst type, market cap, float, time of day, and liquidity
