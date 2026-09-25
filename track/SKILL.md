---
name: track
description: Review the management tracking file and walk the user through every open item for status updates, then write their answers back into the file. Triggered by /track, optionally with "daily" or "weekly" to set the scope. Use when the user wants to be reminded of and update the things they are keeping an eye on.
---

## Context

Vault: `~/Projects/documentation/`
Tracking file: `work/02_Areas/Management/Tracking.md`
Completed archive: `work/02_Areas/Management/Tracking Completed.md`

This is the single at-a-glance rollup of things Jérémy is keeping an eye on or needs to
achieve. The daily 1on1 / team notes under `work/02_Areas/Management/Meetings/` remain the
source of truth; `Tracking.md` is the surface for review and reminders. Completed items do
**not** stay in `Tracking.md` — they move to `Tracking Completed.md` so the live file stays lean.

Item format in the file:
- `- [ ]` open, `- [x]` done
- `📅 YYYY-MM-DD` marks a hard date
- `[[Person]]` links the source
- Sections in `Tracking.md`: **Deadlines (dated)**, **Watch points (no hard date)**, **Direct Reports — active projects**, **Longer horizon**. The **Done** heading is just a pointer to `Tracking Completed.md`.
- `Tracking Completed.md` is the archive of finished items, newest first, grouped by month (`## YYYY-MM`).

The **Direct Reports — active projects** section is a person-keyed roster: one line per direct
report as `[[Person]] (team · role) — current project — one-line definition`. It is not a task
list — it is a rough picture of what each report is working on, so reviews and reminders have context.

## Related

`/week` is the read-only counterpart: a one-screen bullet list of what is due in the next 7 days,
no questions and no edits. Use it for a quick look; use `/track` when status needs recording.

## Arguments

- `/track` or `/track daily` — default. Focus on what is **due, overdue, or this week**, plus any watch point that has gone quiet. Skips the Direct Reports roster.
- `/track weekly` — review **every** open item across all sections, **including** the Direct Reports roster.
- `/track reports` — review **only** the Direct Reports roster: walk each report, confirm/update their current project and definition.

## Process

1. **Read `Tracking.md`.** Get today's date from the environment (`currentDate`) — do not guess.

2. **Triage against today.** Compute for each dated item whether it is:
   - 🔴 overdue (📅 date < today)
   - 🟠 due this week (today ≤ 📅 ≤ today+7)
   - 🟡 upcoming (later)
   Watch points have no date — always in scope for `weekly`, and in scope for `daily` if they
   look stale (no update noted recently).

3. **Present the scoped list first** — a short, scannable summary grouped by urgency, so the
   user sees the shape before answering anything. No fabrication: only what is in the file.

4. **Walk items one at a time.** For each in-scope item, ask a single focused question:
   *"Where does this stand?"* Offer likely outcomes when useful (done / in progress / blocked /
   reschedule / drop). Use `AskUserQuestion` when a small set of choices fits; otherwise ask in
   plain text. Do **not** dump all questions at once — one item, wait, next.

5. **Record each answer immediately** by editing the files:
   - **Done** → check the box `- [x]`, append ` ✅ YYYY-MM-DD`, **remove it from `Tracking.md`**, and
     add it to the top of the right `## YYYY-MM` group in `Tracking Completed.md` (create the month
     heading if it's the first item that month). Trim to a one-line record with its wikilinks; if the
     item leaves a small residual, add a fresh lean item for just that residual in `Tracking.md`.
   - **Progress / blocker** → append a short dated note in parentheses on the item line, e.g.
     `(2026-08-17: waiting on ERP team)`. Keep it to one line.
   - **Reschedule** → update the `📅` date.
   - **New item surfaced** → add it under the right section in the same format.
   - **Drop** → remove the line (confirm first). Dropped ≠ done — it does not go to the archive.

6. **Bump `updated:`** in the frontmatter of any file you touched (`Tracking.md` and/or `Tracking Completed.md`) to today.

7. **Close** with a two-line recap: what changed, and what is still open and most urgent.

## Direct Reports roster (`/track reports`, and inside `/track weekly`)

Walk the **Direct Reports — active projects** section one report at a time. For each, ask a single
question: *"What is [Name] working on now — still X, or something new?"* Then edit their line to
keep `current project — one-line definition` accurate. Rules:

- Keep it **rough** — one project (or the main one or two) and a short definition. This is a
  context surface, not a status report.
- If the report has a hard date (departure, leave return), keep the `📅` on their line.
- If a report **leaves** the team, move their line out (delete after confirming) rather than to Done.
- If a **new direct report** appears, add a line in the same format; ask their team, role, and current project.
- Never invent an assignment. If the user is unsure, leave the line as `_to confirm_`.
- The roster roughly matches the `Direct Report` flags in `Teams/*.md` — cross-check there if unsure who reports to Jérémy.

## Rules

- Never invent status. If the user does not know, leave the item unchanged and note nothing.
- Keep item lines to one line each — `Tracking.md` is a scan surface, not a log. The narrative
  detail belongs on the person/project note (link to it with `[[...]]`); don't let it accrete here.
- When walking items, actively **consolidate**: merge duplicates/overlapping items, and flag anything
  fully superseded so it can be closed or dropped. A leaner file is the goal, not just an updated one.
- Preserve `[[WikiLinks]]` and the `📅 YYYY-MM-DD` convention exactly.
- Do not touch the source meeting notes; only edit `Tracking.md`.
- If the file is missing, tell the user and offer to seed it from the management notes.
