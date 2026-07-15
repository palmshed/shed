## Objective
- Rebrand VS Code → **Shed** (Palmshed) across naming, icons, CLI, licensing, and remove Microsoft corporate infra; ship a working `Shed.app` desktop build with quiet "no loud" aesthetics and a functional integrated terminal.

## Important Details
- **Product**: "Shed" — UI, window titles, binaries, app names, data folders (`dataFolderName: ".shed"`, `darwinBundleIdentifier: "com.shed.app"`, `urlProtocol: "shed"`)
- **Company**: "Palmshed" — copyright `Copyright (c) 2015 - 2026 Palmshed. All rights reserved.`, license headers
- Brand icon: palm tree SVG, stroke `#24d455` (`resources/palmshed-code.svg`)
- **Node v26.3.0** (Homebrew); **Electron 42.6.0**; **.nvmrc requires Node 24.18.0**
- Root `.npmrc` sets `runtime=electron`, `target=42.6.0`, `disturl=https://electronjs.org/headers`, `build_from_source=true`, `legacy-peer-deps=true`
- `build/npm/preinstall.ts` blocks on Node major mismatch UNLESS `VSCODE_SKIP_NODE_VERSION_CHECK=1` is set
- `node-abi` is too old for Electron 42 → `prebuild-install` fails; source compile via `npm rebuild` (with `.npmrc`) is the correct path
- Built app output dir: **`/Users/bniladridas/Downloads/VSCode-darwin-arm64/Shed.app`** (parent of repo, NOT inside `vscode-main/`)
- **After every build, strip `checksums` from `Shed.app/Contents/Resources/app/product.json`** OR the corrupt-install prompt appears
- **CRITICAL post-build step (terminal fix):** the repo is NOT a git repo, so `getVersion()` (`build/lib/getVersion.ts`) returns `undefined` and `gulpfile.vscode.ts:304` drops `commit` from `product.json`. With no `commit`, `importAMDNodeModule` (`src/vs/amdX.ts:213`) sets `isBuilt=false` and loads AMD modules from `node_modules/` instead of `node_modules.asar/` → `@xterm/xterm/lib/xterm.js` 404s → terminal blank. **Fix: after build, add a `commit` field to the BUILT product.json** (and strip checksums):
  ```bash
  node -e 'const fs=require("fs");const p="/Users/bniladridas/Downloads/VSCode-darwin-arm64/Shed.app/Contents/Resources/app/product.json";const j=JSON.parse(fs.readFileSync(p,"utf8"));delete j.checksums;j.commit=require("crypto").randomBytes(20).toString("hex");fs.writeFileSync(p,JSON.stringify(j,null,"\t"));console.log("patched: commit set, checksums stripped");'
  ```
- **Relaunch MUST kill the stale process first:** `pkill -9 -f Shed.app` — `open` alone only focuses the already-running (pre-patch) instance.
- `extensionsGallery` is in `product.json` → Open VSX Registry (extension search works)
- node-pty + 8 native modules rebuilt against Electron 42 (spdlog, sqlite3, native-watchdog, native-keymap, native-is-elevated, @vscode/deviceid, @vscode/fs-copyfile, kerberos); verified load in Electron
- Launch: `open /Users/bniladridas/Downloads/VSCode-darwin-arm64/Shed.app --args --user-data-dir=/tmp/shed-dev-profile`
- CDP debugging: app launched with `--remote-debugging-port=9222`; the workbench page target is the `vscode-file://...` page; `window.code`/`window.vscode.commands` are NOT exposed in built (isBuilt) mode — open a terminal via `Ctrl+\`` keystroke or query DOM (`.xterm`, `.single-terminal-tab`). Node 26 has global `WebSocket`/`fetch` for a dependency-free raw CDP client.

## Work State
### Completed
- All prior rebrand work (naming, icons, CLI, dirs, copyright, website clone, ThirdPartyNotices move, .github workflows)
- `cgmanifest.json` restored (curl from microsoft/vscode main)
- Editor empty-state placeholder: 4 `letterpress-*.svg` replaced with Palmshed palm logo (user confirmed "beautifully understated")
- `extensionsGallery` re-added (Open VSX)
- All 8 native modules + node-pty rebuilt against Electron 42
- **Terminal FIXED and VERIFIED:** root cause was missing `commit` in `product.json` (see Important Details). After injecting `commit` + stripping `checksums` and force-relaunching: xterm.js now loads from `node_modules.asar` (no ERR_FILE_NOT_FOUND), `.xterm` renders, shell integration injection succeeds (`/private/var/folders/.../T/<user>-shed-zsh` created with `drwx-----T`), and a real `/bin/zsh -il` shell spawns (PID 68907, parent = Shed ptyhost node process). Terminal shows interactive shell + Copilot CLI hint banner.

### Active
- Terminal functional. The "Failed to set sticky bit ... ENOENT" in `ptyhost.log` is a benign transient first-attempt error during shell-integration dir creation; the dir is created and chmod succeeds on retry — injection ultimately succeeds.
- The `vscode.mermaid-markdown-features` "CANNOT use 'legacyToolReferenceFullNames' without 'chatParticipantPrivate' API proposal" is a harmless console warning.

### Blocked
- None. Terminal works.

## Next Move
1. Make the `commit` injection persistent across rebuilds. Cleanest non-invasive option: run the post-build node one-liner (above) after every `gulp vscode-darwin-arm64`. Alternative permanent options (not yet applied, would modify repo/build): (a) `git init` + commit so `getVersion()` returns a real SHA; (b) build with `BUILD_SOURCEVERSION=<40hex>` + `VSCODE_QUALITY=stable` (note: `BUILD_SOURCEVERSION` triggers `extensions/copilot/.esbuild.mts` to rewrite `extensions/copilot/package.json` with `buildType:'prod'` — a repo-side effect).
2. (Pending earlier roadmap) `git add -A && git commit && git push -u origin main` to `palmshed/shed` (repo exists, empty; rebrand + website uncommitted). Note: initializing git also naturally fixes the `commit` issue via `getVersion()`.

## Relevant Files
- `/Users/bniladridas/Downloads/vscode-main/product.json`: naming source; `extensionsGallery` (Open VSX); built copy gets `commit` injected + `checksums` stripped
- `/Users/bniladridas/Downloads/vscode-main/build/lib/getVersion.ts:8`: returns `BUILD_SOURCEVERSION` (40-hex) else `git.getVersion`; repo has no git → undefined
- `/Users/bniladridas/Downloads/vscode-main/build/gulpfile.vscode.ts:302-304`: `json.commit = commit` (undefined when no git → field dropped)
- `/Users/bniladridas/Downloads/vscode-main/src/vs/amdX.ts:210-234`: `importAMDNodeModule` uses `node_modules.asar` only when `isBuilt` (= `Boolean(product.commit)`)
- `/Users/bniladridas/Downloads/vscode-main/src/vs/workbench/contrib/terminal/browser/terminalInstance.ts:788`: loads xterm via `importAMDNodeModule('@xterm/xterm','lib/xterm.js')`
- `/Users/bniladridas/Downloads/vscode-main/src/vs/platform/terminal/node/terminalEnvironment.ts:220-254`: zsh shell-integration zdotdir + sticky bit (benign ENOENT on first attempt)
- `/Users/bniladridas/Downloads/vscode-main/src/vs/workbench/browser/parts/editor/media/letterpress-{dark,light,hcDark,hcLight}.svg`: Palmshed palm placeholder (done)
- `/Users/bniladridas/Downloads/VSCode-darwin-arm64/Shed.app/Contents/Resources/app/product.json`: built, patched (commit + checksums stripped)
- `/Users/bniladridas/Downloads/VSCode-darwin-arm64/Shed.app/Contents/Resources/app/node_modules.asar`: xterm present (`/@xterm/xterm/lib/xterm.js` 392KB, loadable); transparent `node_modules/` form only works via `vscode-file` protocol when `isBuilt` (commit set)
- `/tmp/shed-dev-profile/logs/<session>/ptyhost.log`: shell-integration sticky-bit log
- `/tmp/cdp_*.js`: raw CDP clients (no deps; global WebSocket/fetch) for terminal verification
