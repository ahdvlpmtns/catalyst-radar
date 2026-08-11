# Catalyst Radar

A dependency-free prototype for tracking stock-moving catalysts: news, filings, guidance changes, FDA events, offerings, contracts, rumors, and other events that can move prices.

## Run

```bash
/Users/andres/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node server.js
```

Then open `http://localhost:4173`.

SEC filing alerts are fetched live through the local server with a declared User-Agent and a short cache. Quote enrichment is supported through Finnhub when `FINNHUB_API_KEY` is set. Historical minute bars, true relative volume, bid/ask spreads, and float data still require a fuller market-data provider.

The default review window is seven days so recent filings remain visible on weekends and market holidays. Finnhub's quote percentage is presented as the current day move, not as a measured filing-to-price reaction. The app does not display a generated price chart as though it were market history.

## Evidence workflow

Version 0.5 separates the app into three clear areas:

- **Start Here** groups filings into Confirmed Activity, Waiting, and Excluded From Test
- **Live Radar** contains the complete filing scanner, evidence reason, source links, risks, and plain-language explanations
- **Results** contains the automatic signal log, sample metrics, simulated account, watchlist, and notes

These states are research classifications, not buy or sell instructions. Confirmed Activity means only that the fixed filing and price gates passed; it does not prove that the filing caused the move.

## Optional quote enrichment

```bash
SEC_USER_AGENT="CatalystRadar/0.1 your-email@example.com" \
FINNHUB_API_KEY="your_finnhub_key" \
/Users/andres/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node server.js
```

Without `FINNHUB_API_KEY`, the app still runs as a live SEC filing radar and leaves price reaction fields marked `Pending`.

## Automatic signal study

The server records every filing it sees and applies one fixed bullish baseline:

- Filing is no more than 30 minutes old when evaluated
- A quote newer than the filing is available
- Current-day move is at least +2%
- Offering and dilution filings are excluded
- Eligible signals use a +2% target, -1% stop, and 60-minute horizon

No manual outcome buttons are used. The server captures real Finnhub quote snapshots while it is awake and labels target, stop, expiration, or incomplete data automatically. A valid expiration requires at least 20 snapshots. This is not minute-bar verification and may miss prices touched between snapshots.

The paper account starts at $1,000, uses $100 per completed signal, and subtracts an estimated 0.30% round-trip cost. It does not model exact spreads, halts, taxes, borrow availability, or concurrent position limits.

## Persistence

The default ledger path is `./data/signal-ledger.json`. Set `DATA_DIR` to another writable directory when needed. The file survives normal local restarts, but Render's default filesystem is ephemeral and may reset after a deploy or instance replacement. Durable production evidence requires a persistent disk or external database.

## Product direction

The next milestones are improving data durability and result accuracy:

- SEC EDGAR filings for primary-source filing alerts
- Nasdaq halt RSS for halt/resume events
- Durable cloud storage for every candidate and its original feature snapshot
- A market-data provider with one-minute OHLCV, relative volume, bid/ask spreads, and historical bars
- Automatic target/stop/expiration labels from one-minute historical bars
- Out-of-sample reporting by catalyst type, price, time of day, and liquidity without changing the baseline rules mid-sample
