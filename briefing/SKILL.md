---
name: briefing
description: Make Jérémy's daily morning podcast script (his day from Tracking and calendar, weather for the bike ride, and the news that matters to him), written to be read aloud, and log the episode in the vault. Triggered by /briefing, "make today's episode", "morning briefing", "today's podcast". Also handles feedback after listening — /briefing feedback, or any reply after an episode such as "backend ad check → Thursday" or "the Fed story was useless" — writing dates into Tracking and lessons into the Interest Profile.
---

## Context

Vault: `~/Projects/documentation/` · App folder (`$APP`): `personal/01_Projects/Monorepo/Apps/Daily Podcast/`

| File | Role |
|---|---|
| `$APP/Sources.md` | Calendar ICS link, Gmail labels, RSS feed table |
| `$APP/Interest Profile.md` | Interests, bar per segment, style notes, feedback log |
| `$APP/Episodes/YYYY-MM-DD.md` | One log per episode; the last 7 are the memory |
| `work/02_Areas/Management/Tracking.md` | Tasks (format and done-rules: see the `track` skill) |

Scripts live in this skill's `scripts/` folder. Run them with `NODE_USE_ENV_PROXY=1 NODE_NO_WARNINGS=1 npx tsx` from there (run `npm ci` once if `node_modules/` is missing). Each prints JSON. The env vars make Node's `fetch` go through `HTTPS_PROXY` in cloud sessions, where direct DNS fails. On a laptop with no proxy set they change nothing. If a host comes back `403 Forbidden` from the tunnel, the cloud environment's network allowlist is missing it: record it in `errors` and name the host.

- `calendar.ts <ics-url> [YYYY-MM-DD]`: the day's meetings, recurring series expanded
- `feeds.ts <path-to-Sources.md> <since-ISO>`: RSS Items published after `since`
- `weather.ts [YYYY-MM-DD]`: Stockholm forecast for the 05:00–06:00 and 17:00–18:00 rides

Every input becomes an Item: `{ segment, source, title, text, url, publishedAt }`.
Editorial rules, script style and the episode-log template: [REFERENCE.md](REFERENCE.md).

## Process: `/briefing` (make the episode)

1. `git pull`. Read `Sources.md`, `Interest Profile.md`, `Tracking.md` and the last 7 files in `Episodes/`.
2. **Window:** `since` = `generatedAt` of the newest episode; no episode yet → now minus 24h.
3. **Collect, in parallel:** the three scripts (ICS URL from `Sources.md`), and Gmail. For Gmail, `list_labels`, keep names starting `Podcast/`, and for each search `label:podcast-<name> after:<YYYY/MM/DD of since>`. Drop messages older than `since`. Read each with `get_thread` and split it into Items, one per story. A failing input is recorded in `errors`; never stop.
4. **Your day** (REFERENCE §1): overdue → meetings → prep links → due today and next 7 days → up to 3 proposed dates → weather.
5. **News** (REFERENCE §2): segment → cluster → repeat check → bar test → fetch full articles for kept stories → log near misses.
6. **Write the script** (REFERENCE §3). If there are errors, send them first in one short separate message. Then send the script as **one message containing only the script**.
7. **Log** to `Episodes/YYYY-MM-DD.md` (REFERENCE §4). Commit `Daily Podcast: episode YYYY-MM-DD` with only that file, then push.

## Process: feedback

Runs on `/briefing feedback [date]`, or on any reply after an episode in the same session. No date given → today's episode. Load that episode log.

1. Sort what was said into dates, done items, story feedback and style notes. Dictated text is messy; read for intent.
2. **Dates:** write `📅 YYYY-MM-DD` on the Tracking line. Move it from "Watch points (no hard date)" to "Deadlines (dated)". Set `status: confirmed|changed` in the log's `proposedDates`.
3. **Done items:** close them following the `track` skill's rules (move to `Tracking Completed.md` with `✅`).
4. **Story feedback:** set the chapter's `feedback` (or mark a near miss `wronglyDropped: true`). Append to the profile's feedback log as a **general lesson**: `YYYY-MM-DD 👎 Fed rate commentary with no EU/ETF angle`.
5. **Style notes** ("fewer jokes") go to the profile's Style notes section.
6. Can't tell which story or item is meant → ask, don't guess.
7. Write, then report in one line ("3 dates set, 2 lessons added, 1 item done"). Commit `Daily Podcast: feedback YYYY-MM-DD` with only the touched files, then push.
8. If the feedback log has more than ~30 lines, **propose** folding recurring lessons into the interest sections. Never rewrite interests unasked.

## Rules

- Gmail is read-only and limited to `Podcast/*` labels: never send, draft, label, archive, delete or mark.
- Never print the ICS link in chat, the script or a log.
- Never put Tracking content or people's names into web searches, fetched URLs or any outside call.
- Generation mode never edits Tracking. It only proposes dates. Feedback mode may edit `Tracking.md`, `Tracking Completed.md`, the profile and episode logs.
- Nothing from memory: every story, fact and number comes from a collected Item with a URL. "Why it matters to you" may reason but adds no facts.
- Never pad: an empty segment is one spoken line. Repeats come back only as a one-sentence Update.
- At most 3 proposed dates per episode. Standing items only when a matching meeting is today.
- Interests and style come from the Interest Profile, never from this skill.
- All times are Europe/Stockholm. Aim for a ready script in about 5 minutes.
- Never commit `.obsidian/workspace.json` or files the skill didn't write.
