---
name: feature
description: Create a feature document through user interview and codebase exploration, saved to the documentation repo. Triggered by /feature followed by a feature description. Produces a structured markdown spec under ~/Projects/documentation/{work|personal}/01_Projects/<ProjectName>/Specs/.
---

## Context

Documentation repo: `~/Projects/documentation/`
Structure: `work/` and `personal/`, each following PARA — `00_Inbox`, `01_Projects`, `02_Areas`, `03_Resources`, `04_Archive`.
Feature documents go in: `01_Projects/<ProjectName>/Specs/<feature-name>.md`

## Process

1. **Receive the brief** — read the feature description carefully. Identify what is clear, what is ambiguous, and what is missing.

2. **Determine the project** — if the brief names a project clearly, confirm in one line: "I'll save this under `work/01_Projects/<ProjectName>/` — correct?" If not stated, ask: work or personal, and which project (listing existing ones). Create a new project folder with `Notes/`, `Research/`, `Specs/` subfolders if it doesn't exist.

3. **Explore the codebase** — if invoked inside a code repo, read relevant files to verify assumptions in the brief before asking about them.

4. **Interview the user** — one question at a time, in dependency order. For each question:
   - Lead with your recommended answer and reasoning
   - Let the user confirm or correct
   - Do not ask the next question until the current one is answered

   Cover every section that can't be filled from the brief or codebase:
   - **Problem** — who is affected and what pain does this solve?
   - **Solution** — what is the proposed approach?
   - **User stories** — all actors and scenarios, including edge cases
   - **Implementation** — modules affected, schema/API changes, key decisions
   - **Out of scope** — explicit exclusions
   - **Open questions** — unresolved decisions

5. **Draft the document** using this structure:
   ```
   # <Feature Name>

   ## Problem Statement
   ## Solution Overview
   ## User Stories
   ## Implementation Notes
   ## Out of Scope
   ## Open Questions
   ```

6. **Show the preview** inline and ask for approval. Do not write to disk until approved.

7. **Write the file** to `~/Projects/documentation/<work|personal>/01_Projects/<ProjectName>/Specs/<feature-name>.md`.

8. **Flag glossary candidates** — after writing, scan the feature doc for domain-specific terms that may not be in the project glossary. If any are found, output: "New terms detected — consider running `/glossary` to capture them: <term list>"

## Rules

- One question at a time, no exceptions.
- Always lead with a recommended answer — never ask a blank question.
- Skip questions already answered by the brief or codebase exploration.
- Do not include file paths or code snippets in Implementation Notes — they go stale.
- Never write to disk before the user approves the preview.
- Feature name in filename: kebab-case, no date prefix.
