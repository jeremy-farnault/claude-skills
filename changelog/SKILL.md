---
name: changelog
description: Bring the apps' public changelogs up to date from the commits since the last run. Triggered by /changelog, "update the changelogs", "are the changelogs up to date", "backfill the changelog". Reads the jeremy-farnault-apps commits after the stored checkpoint plus the vault's done specs, bugs and chores, drafts entries written for portfolio visitors, and commits them (with the moved checkpoint) only after Jérémy has reviewed the drafts.
---

## Context

- Apps repo: `~/Projects/jeremy-farnault-apps/` (in a cloud session, wherever it's cloned).
  - Entries: `packages/changelog/src/entries/<app>.ts`, one file per app; `shared.ts` for `apps: "all"`.
  - Entry shape and app ids: `packages/changelog/src/types.ts`.
  - Checkpoint: `reviewedThrough` in `packages/changelog/src/checkpoint.ts`, the last commit reviewed (`null` = never run).
  - **What makes a good entry:** the *Changelog* section of the repo's `CLAUDE.md`. Read it every run; it's the source of truth, not this file.
- Vault: `~/Projects/documentation/personal/01_Projects/Monorepo/<App>/`: `Specs/`, `Bugs/`, `Chores/`, with `status: done` and a `done:` date in their frontmatter.

## Process

1. **Sync.** `git pull` both repos. If the apps repo is a shallow clone, `git fetch --unshallow` first: the checkpoint may be older than the clone.
2. **Range.** Read the checkpoint. The range is `<checkpoint>..HEAD` on `main`, or the full history when it's `null` (the backfill). If the checkpoint SHA isn't in the history, stop and say so.
3. **Read the commits** oldest first, with subject, date and files touched. Subjects name the app (`Financer: …`, `ui: …`) and often the spec and ticket (`(Faster spending input, ticket 02)`); the files touched confirm which apps a change reaches.
4. **Read the vault** for the same dates: the done specs, bugs and chores the commits name. They say what a feature was *for*; entries should too.
5. **Group into changes a user would notice:**
   - A spec is one change, whatever its number of tickets; it's dated by its last commit.
   - A user-visible bug fix or chore is one change.
   - Shared packages (`ui`, `auth`, `db`…) go to the apps they reach, or `"all"` if every app gets it. A backend (`furyo-api`, `aider-broker`, the `auth` app) goes to the apps where it shows.
   - Leave out internal work: CI, refactors, migrations, demo fixtures, screenshots, docs, tooling.
6. **Skip what's already there.** Commits that touched `packages/changelog/src/entries/` added entries already (the `CLAUDE.md` rule). Match by feature, not by wording.
7. **Draft** each entry: `id` (`<app>-<slug>`, or `all-<slug>`), `date` (the day the change's last commit landed), `kind` (`new` / `improved` / `fixed`), `title`, `description`, `apps`.
8. **Present for review**, shared entries first, then app by app: each draft with the commits it covers. Then two short lists: *skipped, already have an entry* and *left out as internal*, one line each. For a long range (the backfill), present one app at a time.
9. **Iterate** on Jérémy's edits until he approves.
10. **Write.** Add the entries to their files, newest first. Set `reviewedThrough` to the full SHA of the range's last commit. Run `pnpm --filter @jf/changelog test` and `pnpm --filter @jf/changelog lint`. Make **one commit** with the entries and the checkpoint: `Changelog: entries through <short sha>`.
11. **Don't push.** The apps repo pushes once per session (every push builds every Vercel project). Say the commit is waiting.

## Rules

- Never write entries or move the checkpoint before Jérémy approves the drafts.
- The checkpoint only moves in the same commit as the entries. If there's nothing new, it still moves, after he confirms "nothing new".
- Never rewrite existing entries unless asked.
- Entries are public. No personal data: no amounts, people's names, health details, places, or anything read from the apps' data. Describe what the app can do, not what Jérémy did with it.
- No date in the future, and no date earlier than the change's commits.
