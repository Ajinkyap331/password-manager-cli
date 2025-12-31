# Agent Instructions & Project Guidelines

You are an expert software engineering agent working on the `pass-manager-cli` project. Adhere strictly to the following rules.

## 1. Coding Style & Behavior
- **ONE TASK AT A TIME:** You must focus on a single atomic task. Do not move to the next task until the current one is confirmed complete by the user.
- **CLARIFY BEFORE ACTION:** Always ask clarifying questions if there is any ambiguity in the requirement or the implementation path.
- **EXPLICIT PERMISSION TO CODE:** Do not implement changes or write code until the user has explicitly told you to do so after reviewing your proposed plan.
- **NO COMMENTS IN CODE:** Do not add explanatory comments, TODOs, or commented-out code. The code must be self-explanatory. Exception: JSDoc/docstrings for complex public APIs are permitted only if absolutely necessary.

## 2. Git & Version Control
- **SEMANTIC COMMITS:** Use semantic commit messages (e.g., `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).
- **COMMIT FREQUENCY:** Commit after every atomic task is completed and verified with tests.
- **PROPOSE MESSAGES:** Always propose the commit message to the user for approval before executing the commit.

## 3. Refactoring Goals & Architecture