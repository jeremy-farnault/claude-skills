---
name: tickets
description: Break a feature document into actionable tickets saved as markdown files in the documentation repo. Triggered by /tickets <path-to-feature-doc>. Creates one file per ticket under 01_Projects/<ProjectName>/Specs/tickets/<feature-name>/. Use after /feature to move from spec to execution.
---

## Context

Documentation repo: `~/Projects/documentation/`
Tickets go in: `01_Projects/<ProjectName>/Specs/tickets/<feature-name>/`
Filename format: zero-padded sequence by dependency order — `01-ticket-name.md`, `02-ticket-name.md`, etc.

## Process

1. **Receive the feature doc path** — if not provided at invocation, ask for it. Read the feature doc in full.

2. **Ask about external links** — in one question, ask if there are any relevant external resources (Figma, docs, RFCs, etc.) and which tickets they apply to. Skip if none.

3. **Propose the ticket breakdown** — list all tickets with title and one-line summary, ordered by dependency. Ask for approval before writing anything.
   - Iterate if the user wants to add, remove, merge, or reorder tickets.

4. **Interview per ticket if needed** — for any ticket that lacks enough detail in the feature doc to fill all sections, ask targeted questions (one at a time) before drafting that ticket.

5. **Draft all tickets** inline and ask for final approval. Each ticket follows this structure:
   ```
   # <Ticket Title>

   ## Context
   Brief explanation of why this ticket exists. Link to feature doc.

   ## Acceptance Criteria
   Numbered list of specific, testable conditions.

   ## Dependencies
   Links or titles of tickets that must be completed first.

   ## External Links
   Figma, documentation, or other references (omit section if none).

   ## Out of Scope
   What this ticket explicitly does not cover.
   ```

6. **Write files** once approved to `~/Projects/documentation/<work|personal>/01_Projects/<ProjectName>/Specs/tickets/<feature-name>/`.

7. **Flag glossary candidates** — after writing, scan all ticket content for domain-specific terms that may not be in the project glossary. If any are found, output: "New terms detected — consider running `/glossary` to capture them: <term list>"

## Rules

- Never write to disk before the user approves the full ticket list.
- Ticket titles: verb + noun, action-oriented (e.g. "Add auth middleware").
- Filenames: kebab-case, zero-padded prefix by dependency order.
- Acceptance criteria must be testable — no vague conditions like "works correctly".
- One ticket = one deployable unit of work where possible.
- Omit the External Links section if no links apply to a ticket.
