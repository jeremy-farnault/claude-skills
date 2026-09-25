---
name: week
description: Print a fast, read-only bullet summary of tracking items due in the next 7 days. Triggered by /week, or when Jérémy asks "what's on this week", "what's due", "quick track", "what am I on the hook for". Read-only — never asks questions and never edits files. For the interactive review that writes status back, use /track instead.
---

## What this is

The **five-second view** of `work/02_Areas/Management/Tracking.md`.

`/track` is a session: it walks every item, asks where each stands, and writes answers back.
This is not that. `/week` reads, compresses, prints, and stops.

**Hard rules — these define the skill:**
- **Never edit any file.** Not `Tracking.md`, not frontmatter, not `updated:`. Read-only.
- **Never ask a question.** No `AskUserQuestion`, no "want me to update this?". Print and stop.
- **Never run git.** No pull, no commit.
- If the user wants to change something after reading, tell them to run `/track` — don't do it here.

## Context

- Vault: `~/Projects/documentation/`
- Tracking file: `work/02_Areas/Management/Tracking.md`
- Get today's date from the environment (`currentDate`). Never guess it.

## Scope

**Window: rolling 7 days** — today through today+7 inclusive. Not the calendar week.
Running this on a Friday still surfaces next Tuesday's deadline.

An item's due date is **only** the `📅 YYYY-MM-DD` marker. Dates that appear inside the body
text (`2026-09-24: still nothing back`, `⏰ Reassess Fri 2026-09-25`, `last day 12-21`) are
history or internal notes — they are **not** due dates. Do not promote them.

Include:

| Bucket | Rule |
|---|---|
| 🔴 **Overdue** | `📅` date < today |
| 🟠 **This week** | today ≤ `📅` date ≤ today+7 |
| ⚪️ **No date, hot** | undated item flagged 🔴 or ⭐ in the file. Nothing else — a recent note in the body does **not** qualify it, because `/track` touches every item it reviews |

Exclude everything else — later `📅` dates, quiet watch points, the whole `Tracking Completed.md`
archive. This list is meant to fit on one screen.

## Process

1. Read `Tracking.md`. Nothing else — do not open the meeting notes, person notes, or linked files.
2. Parse every `- [ ]` line. Sub-bullets belong to their parent item; they are detail, not separate items.
3. Bucket each by the table above.
4. Print. Stop.

## How to compress an item

This is the part that matters. Items in the file are long — one runs 400 words with ten
sub-bullets. Your job is to turn each into **one line that names the next physical action**,
not a summary of the item.

For each item, find the thing that would move it and lead with the verb:

- ✅ `Send the recurring 1:1 invite to Hannah`
- ❌ `1:1 with boss — standing slot, queue behind it is real (forum, ladder, bands, budget)`

Rules:
- **One line, ~10 words after the badge**, verb first. No sub-bullets, no nested detail.
- Keep at most **one** `[[WikiLink]]` — the person or thing you'd act on. Drop the rest.
- **Never put the date in the text.** The badge owns it. `Build the EM slides (Thu 1 Oct)`
  is wrong — the date is already on the left.
- If an item is **blocked**, say what on, in three words: `— blocked on the contract template`.
- Strip all decoration: 🔴🎯⚠️📌➡️✉️ etc. The bucket emoji is the only one that survives.
- If the item genuinely has several live actions (the forum slides), pick the one with the
  nearest deadline and append ` +N` — don't expand it.

## The date badge

Every dated line **starts** with its date. This is the whole point of the format — the dates
form a scannable left column, so the week's shape reads before any of the words do.

Build each line as:

```
- `BADGE`  COUNTDOWN  Action text
```

**Badge** — uppercase, backticked, padded with spaces to a constant width across the whole
output so the countdown column lines up:

| When | Badge |
|---|---|
| today | `` `TODAY` `` |
| tomorrow | `` `TOMORROW` `` |
| within the window | `` `MON 28` `` — three-letter weekday + zero-padded day |
| overdue | `` `WED 24` `` — same shape; the 🔴 bucket already says it's late |

Never print the year. Never print the month name in the badge — `MON 28` is enough inside a
7-day window, and the bucket heading carries the rest.

**Countdown** — days from today, right after the badge:

- today → omit it entirely (the badge already says `TODAY`)
- future → `3d`, `7d`
- overdue → `-2d`, `-9d` — negative, so lateness reads instantly

Then two spaces, then the action text. Pad so the action text starts at the same column on
every line.

## Output shape

Plain markdown, no preamble, no closing offer to help:

```
**This week** · Fri 25 Sep

🔴 Overdue
- `WED 24`  -1d  Escalate the consultant contracts to HR

🟠 Next 7 days
- `TODAY`        Talk to Magnus about moving [[Jochen]] to his team
- `MON 28`  3d   Reply to the Berlin candidate — relocation date, not a call
- `MON 28`  3d   Organise the peer-review round with [[Fredrik]]
- `THU 01`  6d   Build the EM slides — eNPS sequencing roadmap  +3
- `FRI 02`  7d   Send the recurring 1:1 invite to [[Hannah Bergenvald]]

⚪️ No date, live
- Career ladder — find [[Johanna]]'s level doc
```

Shape notes:
- Header line: `**This week**` + today as `Fri 25 Sep`.
- The ⚪️ bucket has **no badge and no countdown** — those items have no date. Don't invent one
  and don't substitute a placeholder.
- Drop any bucket that is empty — don't print an empty heading.
- Order within a bucket by date ascending; undated by how recently they moved.
- **If nothing is in scope**, print one line: `Nothing due in the next 7 days.` and stop.
- No totals, no "you have 6 items", no advice on what to do first unless asked.

## Rules

- **Never invent an item, a date, or a status.** Everything printed must exist in `Tracking.md`.
- If a line's next action is genuinely unclear from the file, print the item's subject and
  append `— unclear what's next`. Do not guess an action.
- Don't rank, prioritise, or coach. The buckets are the only judgment you apply.
- If `Tracking.md` is missing, say so in one line and stop.
