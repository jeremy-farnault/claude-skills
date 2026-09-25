---
name: briefs
description: Give a high-level rundown of what a team is working on, or update project briefs from a planning-meeting transcript. Triggered by /briefs <team> for a pre-meeting summary, or /briefs update <team> <transcript-path> after a meeting. Use when Jérémy asks "what is <team> working on / what's the global progress", or wants briefs refreshed from a recording.
---

## Context

Vault: `~/Projects/documentation/`
Briefs live in: `work/02_Areas/Management/Projects/<Team>/<project>.md`
Teams: **Expansion**, **SAD** (Survey & Design). Meeting notes source of truth: `work/02_Areas/Management/Meetings/`.

Each brief is high-level: what it is, why it matters, status (🟢🟡🔴⏸✅), who's on it, key points,
timeline, and a dated `## Log`. The point is a *rough* understanding before a meeting — not a status report.

## Modes

### `/briefs <team>` — pre-meeting rundown (default)
Also triggered by natural language like *"I'm going to a meeting with Expansion, what are they working
on and what's the global progress?"*

1. Read every brief in `Projects/<Team>/`.
2. Produce a **short, scannable rundown**: one line per project — `status emoji · name · one-clause where-it-stands`.
3. Add a 2–3 sentence **global progress** read: what's moving, what's blocked/at risk, what's coming.
4. Flag anything marked `_to confirm_` so Jérémy can fill gaps in the meeting.
5. Do NOT dump full brief bodies unless asked. Keep it to a glance.

### `/briefs update <team> <transcript-or-recording-path>` — post-meeting refresh
Also triggered by *"update the <team> briefs from <file>"*.

1. If given a recording/attachment (not text), transcribe first via gemini-vision:
   *"Use gemini-vision to analyze `<path>` and produce a transcript."*
2. Read all existing briefs in `Projects/<Team>/`.
3. From the transcript, extract per-project updates: progress, decisions, new status, new dates, blockers.
4. For each affected brief:
   - Update the `**Status:**` line and `updated:` frontmatter if it changed.
   - Append a dated bullet to `## Log`, e.g. `- 2026-08-19 — <what changed> (planning meeting).`
   - Update key points / timeline only if materially changed. Keep briefs short.
5. If a **new project** surfaces, create a new brief from the template (see any existing brief).
6. If a **work item** under a project changes (e.g. a Heat Pump 2.0 calc), update that line.
7. Report a summary of what changed, and list anything ambiguous you did NOT record (ask rather than guess).

## Rules

- **Never invent status or progress.** Only record what the transcript / notes support. Leave `_to confirm_` if unknown.
- Keep briefs high-level and one screen long — this is a rough-understanding surface.
- Preserve `[[WikiLinks]]`, the status legend, and the `## Log` (append, never rewrite history).
- Get today's date from the environment (`currentDate`) for log entries — do not guess.
- Only touch files under `Projects/`; never edit the source meeting notes.
- If a team folder is missing or empty, say so and offer to seed it from the meeting notes.
