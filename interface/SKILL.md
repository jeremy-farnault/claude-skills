---
name: interface
description: Generate or update an INTERFACE.md file at the root of a module folder, describing its structure and public interface for LLM agent navigation. Triggered by /interface <path>. Helps agents explore codebases efficiently without deep tree traversal, and supports refactoring context.
---

## Process

1. **Receive the path** — accept a folder path as argument. Default to current directory if omitted.

2. **Check for existing INTERFACE.md** — if found, read it in full before proceeding. Prior "What NOT to touch" and manual notes must be preserved.

3. **Explore the folder** — read the file tree, key source files, exports, imports, and notable symbols. Focus on:
   - Entry points and public exports
   - Internal structure and key files
   - Dependencies (internal modules and external packages)

4. **Draft the INTERFACE.md**:
   ```
   # <Module Name>

   ## Purpose
   One sentence describing what this module does.

   ## Public Interface
   - `<symbol>` — one-line description

   ## Key Internals
   Important non-exported files or concepts needed to navigate this module.

   ## Dependencies
   - **Internal:** other modules this one depends on
   - **External:** notable third-party packages

   ## What NOT to Touch
   Files, patterns, or assumptions to avoid when making changes. Common pitfalls.
   ```

5. **Show the preview** inline and ask for approval.

6. **Interview if needed** — ask targeted questions (one at a time) to clarify anything that couldn't be determined from code alone (e.g. non-obvious constraints, legacy decisions). Update the draft accordingly.

7. **Write the file** to `<path>/INTERFACE.md` once approved.

## Rules

- Never write to disk before the user approves the preview.
- Always preserve manually written "What NOT to Touch" content from an existing INTERFACE.md.
- Descriptions must be one sentence — no paragraphs.
- Focus on what an LLM agent needs to navigate and modify the module safely, not on exhaustive documentation.
- Do not document every file — only what matters for understanding the shape and boundaries of the module.
