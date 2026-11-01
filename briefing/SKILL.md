---
name: briefing
description: Make Jérémy's daily morning podcast script (his day from Tracking and calendar, weather for the bike ride, and the news that matters to him), written to be read aloud, and log the episode in the vault. Triggered by /briefing, "make today's episode", "morning briefing", "today's podcast". Also handles feedback after listening — /briefing feedback, or any reply after an episode such as "backend ad check → Thursday" or "the Fed story was useless" — writing dates into Tracking, lessons into the Interest Profile, and full summaries of flagged stories ("keep the Anthropic one") into the Log/ folder.
---

## Context

Vault: `~/Projects/documentation/` · App folder (`$APP`): `personal/01_Projects/Monorepo/Daily Podcast/` (notes follow `personal/CLAUDE.md`)

| File | Role |
|---|---|
| `$APP/Reference/Sources.md` | Calendar ICS link, Gmail labels, RSS feed table |
| `$APP/Reference/Interest Profile.md` | Interests, bar per segment, style notes, feedback log |
| `$APP/Log/YYYY-MM-DD.md` | One log per episode (`kind: episode`); the last 7 are the memory |
| `$APP/Log/YYYY-MM-DD - Title.md` | Full summaries of stories Jérémy flagged to dig into |
| `work/02_Areas/Management/Tracking.md` | Tasks (format and done-rules: see the `track` skill) |

Scripts live in this skill's `scripts/` folder. Run them with `NODE_USE_ENV_PROXY=1 NODE_NO_WARNINGS=1 npx tsx` from there (run `npm ci` once if `node_modules/` is missing). Each prints JSON. The env vars make Node's `fetch` go through `HTTPS_PROXY` in cloud sessions, where direct DNS fails. On a laptop with no proxy set they change nothing. If a host comes back `403 Forbidden` from the tunnel, the cloud environment's network allowlist is missing it: record it in `errors` and name the host.

- `calendar.ts <ics-url> [YYYY-MM-DD]`: the day's meetings, recurring series expanded
- `feeds.ts <path-to-Sources.md> <since-ISO>`: RSS Items published after `since`
- `weather.ts [YYYY-MM-DD]`: Stockholm forecast for the 05:00–06:00 and 17:00–18:00 rides. Run it for today (ride home) and tomorrow (ride to work).

Every input becomes an Item: `{ segment, source, title, text, url, publishedAt }`.
Editorial rules, script style and the episode-log template: [REFERENCE.md](REFERENCE.md).

## Process: `/briefing` (make the episode)

1. `git checkout main && git pull`. The vault's source of truth is `main`. Cloud sessions start on a `claude/*` branch, so switch first. Read `Sources.md`, `Interest Profile.md`, `Tracking.md` and the last 7 episodes in `Log/` (files named `YYYY-MM-DD.md`; the `YYYY-MM-DD - Title.md` ones are saved stories).
2. **Window:** `since` = `generatedAt` of the newest episode; no episode yet → now minus 24h.
3. **Collect, in parallel:** the three scripts (ICS URL from `Sources.md`; weather twice: today and tomorrow), and Gmail. For Gmail, `list_labels`, keep names starting `Podcast/`, and for each search `label:podcast-<name> after:<YYYY/MM/DD of since>`. Drop messages older than `since`. Read each with `get_thread` and split it into Items, one per story. A failing input is recorded in `errors`; never stop.
4. **Your day** (REFERENCE §1): overdue → meetings → prep links → due today and next 7 days → weather (today's ride home, tomorrow's ride to work). No proposed dates.
5. **News** (REFERENCE §2): segment → cluster → repeat check → bar test → full story for each kept one (fetch, or web search when blocked) → log every drop with a reason.
6. **Write the script** (REFERENCE §3). If there are errors, send them first in one short separate message. Then send the script as **one message containing only the script**.
7. **Log** to `Log/YYYY-MM-DD.md` (REFERENCE §4). Commit `Daily Podcast: episode YYYY-MM-DD` with only that file, on `main`. Push with `git push origin HEAD:main`, even if the session runs on a `claude/*` branch, so the next run sees this episode. If the push to main is refused, push the branch and tell Jérémy it needs merging. Without the merge, the next episode loses its window.

## Process: feedback

Runs on `/briefing feedback [date]`, or on any reply after an episode in the same session. No date given → today's episode. Load that episode log.

0. If he asks to review the episode, or says nothing specific yet, print a numbered list of chapters per segment, then the `dropped` near misses. He answers by number or name.
1. `git checkout main && git pull`. Sort what was said into dates, done items, story feedback, saves and style notes. Dictated text is messy; read for intent.
2. **Dates** (only when he gives one): write `📅 YYYY-MM-DD` on the Tracking line. Move it from "Watch points (no hard date)" to "Deadlines (dated)".
3. **Done items:** close them following the `track` skill's rules (move to `Tracking Completed.md` with `✅`).
4. **Story feedback:** set the chapter's `feedback` (or mark a near miss `wronglyDropped: true`). Append to the profile's feedback log as a **general lesson**: `YYYY-MM-DD 👎 Fed rate commentary with no EU/ETF angle`.
5. **Saves** ("keep that one", "I want the full summary", "dig into…"): write a Saved note (REFERENCE §5) for that story, kept or dropped. Set the chapter's `saved` to its wikilink. A save also counts as 👍.
6. **Style notes** ("fewer jokes") go to the profile's Style notes section.
7. Can't tell which story or item is meant → ask, don't guess.
8. Write, then report in one line ("1 date set, 2 lessons added, 1 story saved"). Commit `Daily Podcast: feedback YYYY-MM-DD` with only the touched files, on `main`, then `git push origin HEAD:main`.
9. If the feedback log has more than ~30 lines, **propose** folding recurring lessons into the interest sections. Never rewrite interests unasked.

## Rules

- Gmail is read-only and limited to `Podcast/*` labels: never send, draft, label, archive, delete or mark.
- Never print the ICS link in chat, the script or a log.
- Never put Tracking content or people's names into web searches, fetched URLs or any outside call. Story headlines and keywords are fine to search.
- Generation mode never edits Tracking and never proposes dates. Feedback mode may edit `Tracking.md`, `Tracking Completed.md`, the profile, episode logs and saved stories in `Log/`.
- Nothing from memory: every story, fact and number comes from a collected Item or a source found for it, with a URL.
- Never pad: an empty segment is one spoken line. Repeats come back only as a one-sentence Update.
- Standing items only when a matching meeting is today.
- Interests and style come from the Interest Profile, never from this skill.
- All times are Europe/Stockholm. Aim for a ready script in about 5 minutes.
- Never commit `.obsidian/workspace.json` or files the skill didn't write.
