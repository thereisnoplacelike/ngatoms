# Deploy Debug Skill

Autonomous deployment debugger for the NgAtoms docs site on Cloudflare Pages.

## Context

- **Deploy trigger**: push to `main` → Cloudflare Pages auto-builds
- **Build command**: `npm run build --workspace=apps/docs`
- **Output directory**: `apps/docs/dist/browser`
- **Config file**: `wrangler.toml`
- **Branch flow**: work on a fix branch → PR to `rc` → promote to `main`

## Steps

1. **Read the Cloudflare build log** the user pastes (or fetch via `gh` if available) and identify the failing line.

2. **Diagnose root cause** — check for:
   - Wrong output directory (`dist` vs `dist/browser`)
   - `wrangler.toml` using `assets` instead of `pages_build_output_dir` (or vice versa)
   - Missing `<base href="/">` in `apps/docs/src/index.html`
   - Auth token errors → not fixable in code; tell the user to check `CLOUDFLARE_API_TOKEN` scopes
   - Deploy command set in Cloudflare UI (should be empty for Pages Git integration)
   - Angular router needing `HashLocationStrategy` if direct URL access returns 404

3. **Apply fix** — edit the relevant file(s). Keep a running log of each attempt and what was changed.

4. **Commit once** after all fixes are accumulated — do NOT create intermediate commits or multiple PRs. Do NOT add Co-Authored-By lines.

5. **Open a single PR** from the fix branch to `rc` using the `/pr` skill.

6. **After up to 5 attempts**, if still failing, output a full report:
   - Each attempt: what was changed and the resulting error
   - Best hypothesis for root cause
   - Manual steps the user should try in the Cloudflare dashboard
