# Copilot Agent Prompting Guidelines for SuperRemote

This document defines best practices for writing prompts to GitHub Copilot Agent in this project. All contributors and automation tools (like Copilot Agent) should refer to this file before generating or modifying code.

---

## 🔧 TypeScript Configuration Awareness

- **verbatimModuleSyntax is enabled**  
  ➤ Always use `import type { ... }` for type-only imports.

- **strict mode is enabled**  
  ➤ Use `instanceof Error` in `catch (error)` blocks to safely access `error.message`.

---

## 📦 Library Assumptions

- YAML parsing is done using [`js-yaml`](https://github.com/nodeca/js-yaml)
  ➤ Assume `@types/js-yaml` is installed and type-safe parsing is required.

- Only use libraries that are explicitly installed or mentioned in this project. Avoid assuming ambient types are available.

---

## 🧠 Prompt Design Rules

- **Follow types in code**  
  ➤ For data models, read and respect definitions in `src/types/`. Do not assume custom structures.

- **Behavior over implementation**  
  ➤ Prompts should describe what functionality is required, not how to implement it line by line.

- **Validate inputs**  
  ➤ Loader functions must check for required fields and type consistency.

- **Modularity preferred**  
  ➤ Keep logic decoupled, reusable, and clearly named.

---

## 📁 File Structure Conventions

- Place device profiles in: `src/data/devices/`
- Place loaders/utilities in: `src/utils/`
- Type definitions live in: `src/types/`

---

## ✍️ Example Prompt to Copilot Agent

```
@copilot

Create a YAML device profile loader that:
- Reads a file from `src/data/devices/*.yaml`
- Parses it using `js-yaml` and returns a DeviceDefinition object
- Follows `DeviceDefinition` from `src/types/Device.ts`
- Validates required fields
- Uses `import type`, `instanceof Error`, and strict mode conventions
```

---

This file may be updated as project conventions evolve. Refer to it in future prompts to maintain consistency and quality.
