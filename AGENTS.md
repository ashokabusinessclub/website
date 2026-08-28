# Agent Guidelines — Ashoka Business Club

## 1. Security, User Privacy & Credential Protection (NON-NEGOTIABLE)

Security and user privacy are of paramount importance across this entire codebase.

- **NEVER access secret environment files:** Do not read, write, edit, grep, or inspect any `.env`, `.env.local`, `.env.production`, `.env.development`, or any credentials/secret files across the repository (`frontend/`, `cms/`, or root).
- **NEVER output credentials or environment variables:** Do not run shell commands (`printenv`, `env`, `export`, `echo $...`) or write code/scripts that log, expose, or print sensitive credentials, API keys, database URLs, or secret tokens.
- **Strict User Privacy & Data Minimization:** Treat all user data, submissions, and member records as strictly confidential. Never log PII (personally identifiable information), leak data through overly permissive API endpoints, or expose private database fields.
- **Allowed template inspection:** You may only read `.env.example` to understand required environment variable keys and formats.
- **Secrets management:** Never prompt the user to paste actual secrets into chat. When new variables are needed, instruct the user to configure them directly in their local `.env` / `.env.local` or deployment dashboards.
- **No hardcoding:** Never hardcode secret keys, passwords, database credentials, or tokens in source code or commits.

---

## 2. Communication & Clarification: Ask When in Doubt

- **Never guess or make blind assumptions:** If requirements, architectural decisions, edge cases, or intent are ambiguous, **STOP and ask the user questions immediately** before proceeding with changes.
- **Confirm significant changes:** Before performing destructive actions, major refactors, or altering data contracts between the CMS and frontend, consult the user.

---

## 3. Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions).
- If something goes sideways, **STOP and re-plan immediately** — don't keep pushing blindly.
- Use plan mode for verification steps, not just building.
- Write detailed specs upfront to reduce ambiguity.

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean.
- Offload research, exploration, and parallel analysis to subagents.
- For complex problems, throw more compute at it via subagents.
- **One task per subagent** for focused execution.

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake.
- Ruthlessly iterate on these lessons until mistake rate drops.
- Review lessons at session start for relevant project.

### 4. Verification Before Done
- Never mark a task complete without proving it works.
- Diff behavior between main and your changes when relevant.
- Ask yourself: *"Would a staff engineer approve this?"*
- Run tests, check logs, demonstrate correctness.

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask *"is there a more elegant way?"*
- If a fix feels hacky: *"Knowing everything I know now, implement the elegant solution."*
- Skip this for simple, obvious fixes — don't over-engineer.
- Challenge your own work before presenting it.

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding.
- Point at logs, errors, failing tests — then resolve them.
- Zero context switching required from the user.
- Go fix failing CI tests without being told how.

---

## 4. Task Management

- **Plan First:** Write plan to `tasks/todo.md` with checkable items.
- **Verify Plan:** Check in before starting implementation.
- **Track Progress:** Mark items complete as you go.
- **Explain Changes:** High-level summary at each step.
- **Document Results:** Add review section to `tasks/todo.md`.
- **Capture Lessons:** Update `tasks/lessons.md` after corrections.

---

## 5. Core Principles

- **Simplicity First:** Make every change as simple as possible. Impact minimal code. Less code with clear intent is better than overly complex abstractions.
- **No Laziness:** Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact:** Changes should only touch what's necessary. Avoid introducing bugs.

---

## 6. Repository Structure & Conventions

- **`frontend/`**: Vite + React static site.
  - Client-exposed variables must strictly follow the `VITE_` prefix convention. Never prefix private secrets with `VITE_`.
  - Prevent unnecessary re-renders and keep bundle sizes lean.
- **`cms/`**: Payload 3 CMS backend with PostgreSQL.
  - Server-side secrets (e.g. `PAYLOAD_SECRET`, database connection strings) must stay on the backend and never leak to client bundles or APIs.
  - Ensure all collections/fields have strict, explicit access control rules defined.
  - Ensure performant database queries (avoid unbounded relationship depth).

---

## 7. Conventional Commits 1.0.0

All commit messages MUST follow the **Conventional Commits 1.0.0** specification.

### Structure

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: introduces a new feature to the codebase (correlates with `MINOR` in SemVer)
- `fix`: patches a bug in your codebase (correlates with `PATCH` in SemVer)
- `build`: changes that affect the build system or external dependencies
- `chore`: maintenance tasks, tooling configs, housekeeping
- `ci`: changes to CI configuration files and scripts
- `docs`: documentation only changes
- `style`: changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: a code change that neither fixes a bug nor adds a feature
- `perf`: a code change that improves performance
- `test`: adding missing tests or correcting existing tests

### Breaking Changes
- Append a `!` after the type/scope (e.g., `feat!:`, `fix(api)!:`), OR include a footer beginning with `BREAKING CHANGE: <description>` (correlates with `MAJOR` in SemVer).

### Examples
- `feat: allow provided config object to extend other configs`
- `feat(frontend): add responsive mobile navigation menu`
- `fix(cms): resolve access control check for unauthenticated guests`
- `docs: correct spelling of CHANGELOG`
- `feat!: drop support for Node 18`
- `fix: prevent racing of requests`

  Introduce a request id and a reference to latest request. Dismiss
  incoming responses other than from latest request.

  Reviewed-by: Z
  Refs: #123

### Specification Summary (RFC 2119)
1. Commits MUST be prefixed with a type followed by an OPTIONAL scope in parentheses, an OPTIONAL `!`, and a REQUIRED colon and space.
2. `feat` MUST be used when adding a new feature.
3. `fix` MUST be used for bug fixes.
4. Description MUST immediately follow the colon and space after the prefix.
5. If the commit message exceeds character/word limits (keep subject line under 72 characters), provide a concise summarizing header line, followed by a blank line and a detailed body description providing further details.
6. Longer body MUST begin one blank line after the description.
7. Footers MUST begin one blank line after the body and use token format (e.g. `BREAKING CHANGE:`, `Refs: #123`).

---

## 8. Verification & Safety

- Always verify changes with project build, type-check, and lint/test commands.
- Never commit secrets, credentials, or sensitive data to version control.

---

## 9. Git & Deployment

- **DO NOT PUSH** to remote without explicit user approval.
- Stage and commit locally only when instructed; wait for "push" confirmation before running `git push`.
- Never force-push or rewrite history without direct instruction.

---

## 10. Design & UI Conventions (DO NOT List)

- **NEVER use eyebrow text on page headers:** Do not add eyebrow labels, brass rules, or small uppercase category tags above main page titles (e.g., `---Contact`, `---About`, `---Calendar`). Page titles must lead directly at the top of the header without eyebrow text above them.
