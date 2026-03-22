---
name: write-a-skill
description: Create or update a Claude Code skill with a consistent structure. Use when user wants to write a skill, create a slash command, build a new workflow, or automate a repeatable task in Claude Code.
---

## Context

Skills repo: `~/Projects/claude-skills/`
Active skills: `~/.claude/skills/`

## Process

1. **Get the brief** — ask the user what the skill should do if not already described.

2. **Check for existing skill** — look for `~/Projects/claude-skills/<skill-name>/SKILL.md`. If it exists, read it. This is an update, not a new skill.

3. **Design interview** — ask targeted questions to fully understand the skill before writing anything. One question at a time, in dependency order. For each question, lead with your recommended answer and reasoning, then let the user confirm or correct.

   Cover every branch:
   - **Triggers** — what exact phrases, contexts, or situations invoke this skill? Be specific. These inform the `description` field.
   - **Process** — what are the step-by-step actions? For each step: what input does it need, what does it produce, what can go wrong?
   - **Context** — are there hardcoded paths, config values, or external dependencies (tools, vaults, APIs)?
   - **Rules** — what are the hard constraints? What are the anti-patterns to avoid?
   - **Supporting files** — does the skill need `REFERENCE.md`, `EXAMPLES.md`, or `scripts/`? Ask explicitly.

   Do not accept vague answers. Push for specifics.

4. **Draft the skill** using the standard template:

   ```markdown
   ---
   name: skill-name
   description: What it does + specific trigger keywords/contexts. Max 1024 chars.
   ---

   ## Context (omit if not needed)

   Key paths, config, external dependencies.

   ## Process

   1. Numbered steps.

   ## Rules

   - Hard constraints and anti-patterns.
   ```

5. **Show the preview** — output the full draft inline and ask for approval. Do not write to disk until approved. Iterate if needed.

6. **Write the skill** once approved:
   ```bash
   mkdir -p ~/Projects/claude-skills/<skill-name>
   # write SKILL.md and any supporting files
   ```

7. **Symlink** to make it active:
   ```bash
   ln -s ~/Projects/claude-skills/<skill-name> ~/.claude/skills/<skill-name>
   ```
   If the symlink already exists (update case), skip this step.

8. **Confirm** — tell the user the skill is live and remind them to commit when ready.

## Rules

- Interview covers content only — location, symlinking, and git are fixed by convention, never ask about them.
- Description field must include specific trigger keywords so Claude loads the skill in the right contexts.
- Keep SKILL.md under 100 lines — split into supporting files if longer.
- No time-sensitive information in skills — they persist across sessions.
- Never write to disk before the user approves the preview.
