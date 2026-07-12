# 8 Queens

A React + TypeScript + Tailwind rewrite of the classic 8 Queens chess puzzle. Built as a portfolio piece and a fun interactive demo.

## What it does

- Manual placement: click cells to place/remove queens, threat highlighting shows unsafe squares
- Animated auto-solver: watches backtracking algorithm place queens one by one
- Browse all 92 solutions with prev/next navigation
- Confetti celebration when all 8 queens are placed safely
- Collapsible educational panel explaining the puzzle and backtracking

## Stack

- React 18 + TypeScript (strict)
- Tailwind CSS v3
- Vite
- Vitest + React Testing Library

## Structure

```
src/
  components/
    App.tsx             ← root layout
    Board.tsx           ← 8x8 grid with labels
    Cell.tsx            ← individual cell (queen, threat, highlight state)
    Scoresheet.tsx      ← paper scoresheet: move log, clear/solve/prev/next + dot map
    SolutionDots.tsx    ← 92-dot solution map (one dot per solution)
    EducationPanel.tsx  ← collapsible explanation
    Confetti.tsx        ← canvas confetti animation
  hooks/
    useQueens.ts        ← all game state and logic
  utils/
    solver.ts           ← backtracking algorithm, findAllSolutions(), buildThreatMap()
    solver.test.ts      ← unit tests for solver
  types/
    index.ts            ← shared types
  test/
    setup.ts            ← jest-dom setup
```

## Key rules

- No `any` in TypeScript
- All interactive elements must have aria-labels and keyboard support
- The solver finds all 92 solutions on mount (once). Do not re-run on every render
- `buildThreatMap` does not mark the queen's own cell as threatened
- Animation speed: 300ms per queen. Do not change without updating tests
- The queen image is at `/public/squeen.png`. Do not move it

## Commands

```bash
npm run dev           # dev server
npm run build         # production build
npm run lint          # ESLint
npm test              # Vitest (run once)
npm run test:watch    # Vitest watch mode
npm run test:coverage # with coverage
```

## Known issues / current focus

- [x] Add GitHub Copilot instructions (`.github/copilot-instructions.md`)
- [x] Add husky hooks (pre-commit lint, pre-push test)
- [x] Add GitHub Actions CI (`.github/workflows/ci.yml`)
- [x] Already deployed to GitHub Pages
- [x] Add screenshot/GIF to README (`docs/screenshots/`, captured 2026-07-12)
- [x] Add LICENSE (MIT)
- [x] Add security workflow (gitleaks + npm audit)
- [x] Run the a11y skill against the live app and record results here
  - 2026-07-12, axe-core 4.12 (WCAG 2.1 AA): initial run found 13 serious
    `color-contrast` nodes — low-opacity ink text (`text-ink/25`–`/60`) on the
    cream/parchment paper surfaces fell below 4.5:1. Fixed by raising all
    sub-threshold ink text to `text-ink/70` (≈6:1). Re-run: **0 violations,
    38 passes**. Automated checks only cover ~30–40% of issues; screen-reader
    and keyboard-only passes still recommended.
- [x] Run the review-tests skill against solver.test.ts and record results here
  - 2026-07-12: 0 critical, 3 warnings, 1 info. Gaps found and closed with 4
    new tests (17 total now): column-axis threats were untested, threat
    *counts* (the 1 vs 2+ distinction the legend relies on) were untested,
    `findAllSolutions` had no duplicate check, and `isSafe` never saw a
    multi-queen `placed` array.
