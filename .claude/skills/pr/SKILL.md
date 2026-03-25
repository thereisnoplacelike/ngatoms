# PR Creation Skill

## Branch Promotion Flow

```
rc → lts → main
```

- Feature work and fixes go on a short-lived branch, PR into `rc`
- `rc` promotes to `lts`, then `lts` promotes to `main`
- NEVER open a PR directly to `main` unless it is a hotfix explicitly approved by the user

## Steps

1. **Check for uncommitted changes** — run `git status`. Commit or stash before proceeding.

2. **Determine the target branch** using the promotion flow above:
   - New feature / fix → target `rc`
   - Promoting `rc` → target `lts`
   - Promoting `lts` → target `main`

3. **Check for changeset** — if any file under `packages/*` or `registry/` was modified, run `npm run changeset` and commit the generated file before opening the PR. Do not skip this step.

4. **Push the branch** — `git push -u origin <branch>` if not already pushed.

5. **Create the PR** using `gh pr create` with:
   - A conventional commit title (`feat:`, `fix:`, `chore:`, `docs:`, etc.)
   - A short body summarising what changed and why
   - Do NOT add Co-Authored-By lines anywhere

6. **Wait for CI** — check `gh pr checks <number> --watch` and report the result to the user. Do not announce the PR as done until CI is green (or explicitly waived by the user).
