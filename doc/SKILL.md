---
name: doc
description: Create or update feature documentation from a meeting transcript or text input, saved to the documentation repo. Triggered by /doc with an optional project, feature, and input file path. Produces a structured markdown doc under 01_Projects/<ProjectName>/Docs/<feature-name>.md for fast context and accumulated meeting notes.
---

## Context

Documentation repo: `~/Projects/documentation/`
Docs go in: `01_Projects/<ProjectName>/Docs/<feature-name>.md`

## Process

1. **Receive inputs** — accept project name, feature name, and input file path as arguments. If any are missing, ask for them interactively, listing existing projects and features to pick from.

2. **Read the input file** — parse the transcript or document. Extract: decisions made, context, technical details, open questions, and risks.

3. **Check for existing doc** — look for `01_Projects/<ProjectName>/Docs/<feature-name>.md`.
   - If not found: create a new doc from scratch.
   - If found: read it in full, then update it with the new input.

4. **Produce or update the doc** using this structure:
   ```
   # <Feature Name>

   ## TL;DR
   Up to 10 bullets reflecting the current state of the feature.
   Always rewritten from scratch based on full accumulated context.

   ## Background
   Why this feature exists and key decisions made.

   ## How It Works
   Brief functional and/or technical summary.

   ## Open Questions / Risks
   Unresolved items, concerns, or dependencies.

   ## Meeting Log
   ### <Date> — <Input source or topic>
   - Bullet summary of what was discussed or decided.
   ```

5. **Show the preview** inline and ask for approval before writing to disk.

6. **Write the file** to `~/Projects/documentation/<work|personal>/01_Projects/<ProjectName>/Docs/<feature-name>.md`.

7. **Flag glossary candidates** — after writing, scan the input and produced doc for domain-specific terms that may not be in the project glossary. If any are found, output: "New terms detected — consider running `/glossary` to capture them: <term list>"

## Rules

- TL;DR: maximum 10 bullets, always reflects latest state, never appended — always rewritten.
- Meeting Log: always append, never overwrite. One entry per `/doc` invocation.
- Background, How It Works, Open Questions: update in place if new input adds or changes anything.
- Never write to disk before the user approves the preview.
- Filename: kebab-case, no date prefix.
- If no project or feature matches, offer to create a new one.
