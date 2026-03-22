---
name: glossary
description: Manage the ubiquitous language glossary for a project, following DDD principles. Triggered by /glossary <project>. Creates or updates a glossary.md in the project's documentation folder. Other skills (/feature, /doc, /tickets) should flag candidate terms at the end of their output with a suggestion to run /glossary.
---

## Context

Documentation repo: `~/Projects/documentation/`
Glossary file: `01_Projects/<ProjectName>/glossary.md`
One glossary per project, alphabetically sorted, grows over time.

## Process

1. **Receive the project** — accept project name as argument. If omitted, list existing projects and ask.

2. **Read the existing glossary** — if `glossary.md` exists, read and display it. If not, start fresh.

3. **Interactive session** — ask "Add or update a term?" then for each term:
   - **Term** — the canonical name
   - **Definition** — one sentence, plain language
   - **Context** — which bounded context or subdomain it belongs to

   Ask one field at a time. After each term, ask "Add another term? [y/n]". Stop when done.

4. **Show the full updated glossary** as a preview and ask for approval.

5. **Write the file** to `~/Projects/documentation/<work|personal>/01_Projects/<ProjectName>/glossary.md` once approved.

## Glossary File Format

```markdown
# Ubiquitous Language — <ProjectName>

## <Letter>

### <Term>
**Context:** <Bounded context or subdomain>
<One sentence definition.>
```

Entries are sorted alphabetically by term. New letters get their own `##` heading.

## Rules

- Never write to disk before the user approves the preview.
- Terms are canonical — definitions should be precise and agreed upon, not casual.
- Always sort alphabetically after adding or updating terms.
- Other skills (/feature, /doc, /tickets, /interview) must flag new domain terms at the end of their output: "New terms detected — consider running /glossary to capture them: <term list>"
- One term at a time during the interview — never ask for multiple fields at once.
