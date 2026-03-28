---
name: interview
description: Interview the user to reach a clear, shared understanding of a task before execution. Triggered by /interview followed by a task description. Asks one targeted question at a time, leading with a recommended answer, until both parties agree on a structured brief covering goal, scope, constraints, and expected output.
---

## Process

1. **Receive the task** — read it carefully. Map what is clear, what is ambiguous, and what is missing across all five dimensions.

2. **Work through every dimension in dependency order** — do not skip a dimension because it seems obvious. Each answer may reveal branches that affect subsequent questions.

   - **Goal** — what does done look like?
   - **Scope** — what's in and what's explicitly out?
   - **Constraints** — hard limits (tech, time, style, compatibility)
   - **Expected output** — artifact, behavior change, or explanation?
   - **Edge cases** — known unknowns that could derail execution

3. **Ask one question at a time.** For each:
   - State your recommendation first, with reasoning. This is mandatory — never ask a blank question.
   - Wait for the user to confirm or correct before continuing.
   - If the answer opens a new branch, resolve it before moving on.

4. **Output the brief** — once all dimensions are resolved:
   - Goal
   - Scope
   - Constraints
   - Expected output
   - Open questions (if any remain minor)

5. **Get approval** — ask "Does this capture it accurately?" and wait for explicit confirmation. Do not proceed to execution.

## Rules

- All five dimensions must be explicitly resolved before producing the brief — even if your initial read makes one seem obvious, state your assumption and get confirmation.
- Every question must open with a recommendation. "I recommend X because Y — does that fit?" is the pattern.
- If an answer creates a new decision branch, resolve it before advancing to the next dimension.
- Do not accept vague answers. Push for specifics.
- The skill ends at the approved brief. Execution is a separate step.
