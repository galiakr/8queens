# GitHub Copilot Instructions

> Mirrors AGENTS.md at the repo root. Keep both in sync — run the
> `sync-context` skill (from ai-starter-playbook) periodically to check for drift.

## Project context

8 Queens — a React + TypeScript rewrite of the classic 8 Queens chess puzzle. Portfolio piece and interactive demo. Manual placement, an animated backtracking auto-solver, browsing all 92 solutions, and an educational panel.

## Stack

React 18 · TypeScript (strict) · Tailwind CSS v3 · Vite 8 · Vitest + React Testing Library

## Conventions

- Functional components, named exports, TypeScript strict — no `any`
- Tailwind for all styling — no inline styles, no CSS modules
- Co-locate test files with the code they test (`solver.test.ts` next to `solver.ts`)
- `useQueens.ts` owns all game state and logic — components stay presentational

## When writing tests

- Use Vitest + React Testing Library
- Assert specific values — avoid `toBeTruthy` when a specific value check is possible
- `solver.test.ts` covers the backtracking algorithm and threat map — extend it, don't replace it

## When writing components

- Every interactive element needs an aria-label and keyboard support (this project markets itself as accessible — don't regress it)
- Use semantic HTML first — `<button>` not `<div onClick>`

## Domain-specific rules — do not violate without updating tests/docs

- The solver finds all 92 solutions once on mount — never re-run it on every render
- `buildThreatMap` must not mark the queen's own cell as threatened
- Animation speed is 300ms per queen — changing it requires updating the tests that assert on it
- The queen image lives at `/public/squeen.png` — don't move it without updating references

## What to avoid

- No `any` in TypeScript
- No `--no-verify` on commits
- No hardcoded secrets (this project has none currently — keep it that way)
- `npm ci` in CI needs `--legacy-peer-deps` (see deploy.yml) — match that flag in any new workflow, or installs will fail on the Vite 8 / React 18 peer dependency mismatch
