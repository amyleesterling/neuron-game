# Neuron Snake Codex Memory

## Project Snapshot

- Repo: `https://github.com/amyleesterling/neuron-game`
- Primary branch: `main`
- Current pushed HEAD: `fd29925` (`Refine Hive Mind explainer and mobile graph performance`)
- Live site: `https://amyleesterling.github.io/neuron-game/`
- App type: static HTML/CSS/JS game wrapped with Capacitor for native iOS/Android shells

## What This Repo Contains

- `index.html`: main Neuron Snake game
- `brain.html`: Hive Mind page shell
- `brain-v2.html`: heavier inline-script Hive Mind implementation and rendering/perf logic
- `brain.css`: styles for Hive Mind panels and learn cards
- `brain-learn.js`: explainer/learn card copy and card canvas demos
- `brain-data.js`, `brain-icons.js`, `brain-main.js`, `brain-network.js`, `brain-render.js`: game and Hive Mind support scripts
- `gallery.html`, `leaderboard.html`: secondary pages
- `assets/` and `js/`: copied into Capacitor web bundle
- `www/`: generated web bundle used by Capacitor
- `android/` and `ios/`: native Capacitor projects already created and committed

## Build + Native Workflow

- Install deps: `npm install`
- Refresh Capacitor web bundle: `npm run build`
- Sync native projects after web changes: `npm run cap:sync`
- Open Android project: `npm run cap:android`
- Open iOS project on Mac: `npm run cap:ios`

`npm run build` runs `scripts/copy-www.js`, which deletes and rebuilds `www/` by copying root web files plus `assets/` and `js/`.

## Capacitor Setup

- Config file: `capacitor.config.json`
- App ID: `com.neuronsnake.app`
- App name: `Neuron Snake`
- Web dir: `www`
- Plugins already in `package.json`:
  - `@capacitor/core`, `@capacitor/cli`
  - `@capacitor/android`, `@capacitor/ios`
  - `@capacitor-community/admob`
  - `@revenuecat/purchases-capacitor`
  - `@capacitor/splash-screen`, `@capacitor/status-bar`

## Most Recent Pushed Work

Commit `fd29925` refined the Hive Mind experience:

- clearer Hive Mind explainer copy
- new intro copy in the legend panel
- larger text in key Hive Mind UI areas
- mobile performance improvements in `brain-v2.html`
- throttled resize handling and mobile animation pacing
- lighter mobile rendering paths for glows and signal trails
- faster graph construction/layout logic

## Git Status Notes

Tracked work is clean and pushed. These local untracked items exist on the Windows machine and were intentionally not committed:

- `.claude/`
- `android/.idea/`
- `overview cards v2.txt`
- `populations.txt`

Be careful not to commit IDE metadata unless you actually want it in the repo.

## Suggested Mac Bootstrap

1. Clone `https://github.com/amyleesterling/neuron-game.git`
2. `cd neuron-game`
3. `npm install`
4. `npm run build`
5. `npm run cap:sync`
6. `npm run cap:ios`

If iOS dependencies complain, run CocoaPods install steps from inside `ios/App` as needed after opening on the Mac.

## Useful Context For Future Codex Sessions

- This repo is mostly hand-authored static front-end code, not a framework app.
- The game and the Hive Mind pages mix inline page logic with separate JS files, so changes often span both HTML and JS.
- `www/` is generated output for Capacitor; source edits should usually happen in root files, `assets/`, or `js/`, then rebuild.
- When making native-ready web changes, rebuild and sync before testing in Xcode/Android Studio.
