---
name: review
description: Review an open PR against the project's CLAUDE.md standards, focusing on performance, code quality, and best practices. Triggered by /review <PR number or URL>. Outputs a structured report and optionally posts an approval comment to the PR.
---

## Process

1. **Receive the PR** — accept a PR number or full GitHub URL. Use `gh pr view` and `gh pr diff` to fetch metadata and the full diff.

2. **Read CLAUDE.md** — find and read the project's `CLAUDE.md` file. This is the source of truth for project standards.

3. **Review the diff** — analyse every changed file against three lenses:
   - **Performance** — inefficient queries, unnecessary re-renders, blocking calls, memory leaks
   - **Code Quality** — clarity, naming, duplication, complexity, dead code
   - **Best Practices** — adherence to patterns in CLAUDE.md, error handling, security, test coverage

4. **Produce the report** — output inline as structured markdown:

   ```
   ## PR Review: <PR title> (#<number>)

   ### Performance
   - [BLOCKING] `path/to/file.ts:42` — <concise issue>
   - [SUGGESTION] `path/to/file.ts:88` — <concise suggestion>

   ### Code Quality
   - [NON-BLOCKING] ...

   ### Best Practices
   - [BLOCKING] ...

   ### Verdict
   APPROVE | REQUEST CHANGES | COMMENT
   ```

   Each line: one issue, one location, one sentence. No elaboration unless critical.

5. **If verdict is APPROVE** — ask "Post this review as a comment on the PR? [y/n]". If confirmed, post with `gh pr comment`.

6. **If verdict is REQUEST CHANGES or any BLOCKING issues exist** — skip the post prompt entirely.

## Rules

- Any blocking issue forces verdict to REQUEST CHANGES — never APPROVE.
- Never post to the PR without explicit user confirmation.
- Callouts must reference file and line number where possible.
- Each callout must be one concise sentence — no paragraphs.
- CLAUDE.md is the authority on project-specific standards; general best practices are secondary.
- If no CLAUDE.md exists, review against general best practices and note the absence.
