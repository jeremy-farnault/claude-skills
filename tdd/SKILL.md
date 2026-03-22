---
name: tdd
description: Guide test-driven development using red-green-refactor. Triggered by /tdd or when user wants to build a feature or fix a bug using TDD, mentions "test-first", "red-green-refactor", or "write tests first".
---

## Philosophy

Tests verify behavior through public interfaces, not implementation details. A good test survives a full internal refactor. If renaming an internal function breaks a test, the test is wrong.

## Workflow

### 1. Plan
- Agree with the user on the public interface and which behaviors to test
- List behaviors to test (not implementation steps)
- Get approval before writing any code

### 2. Tracer Bullet
Write one test for the most critical behavior. Make it pass with minimal code. This proves the path works end-to-end.

### 3. Incremental Loop
For each remaining behavior:
- RED: write one test → it fails
- GREEN: write minimal code to pass → it passes
- Repeat

Never write multiple tests at once. Never anticipate future tests.

### 4. Refactor
Once all tests pass, look for: duplication, overly complex methods, shallow modules. Run tests after each change.

**Never refactor while RED.**

## Rules

- One test at a time — no horizontal slicing (all tests first, then all code)
- Test through public interfaces only — no private methods, no internal mocks
- Mock at system boundaries only: external APIs, databases, time, file system
- Never mock your own code
- Minimal code to pass the current test — no speculative features
