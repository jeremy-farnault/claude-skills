---
name: interview
description: Interview the user to reach a clear, shared understanding of a task before execution. Triggered by /interview followed by a task description. Asks one targeted question at a time, leading with a recommended answer, until both parties agree on a structured brief covering goal, scope, constraints, and expected output.
---

## Process

1. **Receive the task** — the user invokes `/interview <task description>`. Read it carefully. Identify what is clear, what is ambiguous, and what is missing.

2. **Ask one question at a time** — in dependency order (foundational questions first). For each question:
   - Lead with your recommended answer and reasoning
   - Let the user confirm or correct
   - Do not ask the next question until the current one is answered

3. **Cover these dimensions** (only ask what isn't already clear from the task description):
   - **Goal** — what does done look like?
   - **Scope** — what's in and what's explicitly out?
   - **Constraints** — hard limits (tech, time, style, compatibility)
   - **Expected output** — artifact, behavior change, or explanation?
   - **Edge cases** — known unknowns that could derail execution

4. **Output the brief** — once you have enough clarity, produce a structured summary:
   - Goal
   - Scope
   - Constraints
   - Expected output
   - Open questions (if any remain minor)

5. **Get approval** — ask "Does this capture it accurately?" and wait for explicit confirmation. Do not proceed to execution.

## Rules

- One question at a time, no exceptions. Closely related sub-questions may be grouped only if truly inseparable.
- Always lead with a recommended answer — never ask a blank question.
- Do not accept vague answers. Push for specifics.
- Skip questions already answered by the initial task description.
- The skill ends at the approved brief. Execution is a separate step.
- Never start executing the task during the interview.
