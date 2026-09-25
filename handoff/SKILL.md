---
name: handoff
description: Write a handoff document summarising the current conversation so a fresh agent can continue the work. Triggered by /handoff or when the user says "write a handoff", "handoff doc", "summarise for next session", or similar. Saves to a temp file via mktemp.
---

## Process

1. Run `mktemp -t handoff-XXXXXX.md` to get the temp file path.
2. Read the file before writing (required by Write tool).
3. Write the handoff doc to that path with these sections:
   - **Branch / PR** — current git branch, linked PR or issue if known
   - **Goal** — what this session was trying to accomplish
   - **State** — what is done, what is in progress, what is blocked
   - **Next steps** — concrete actions for the next session, in priority order
   - **Suggested skills** — list any skills the next session should invoke (e.g. /review, /tdd)
   - **References** — paths or URLs to existing artifacts (PRDs, plans, ADRs, issues, diffs); do not duplicate their content
4. If the user passed arguments to `/handoff`, treat them as the focus area for the next session and tailor the "Next steps" and "Suggested skills" sections accordingly.
5. Output the full file path so the user can open or share it.

## Rules

- Never duplicate content already in other artifacts — reference by path or URL only.
- Do not include time-sensitive details (dates, sprint numbers) unless directly relevant.
- Keep the doc under 60 lines — a handoff is a pointer, not a transcript.
- Always read the temp file before writing (Write tool requirement).
