# Language tokens — all the app's text in one place

Every word the app shows lives in **`tokens.csv`**. Change the wording there and the
app updates — no code required. This is the file to edit for typos, rewording, or
adding a language.

## For content editors (no coding)

1. Open `tokens.csv` in Excel or Google Sheets (double-click, or File → Import).
2. Each row is one piece of text:
   - **key** — the app's internal name for it. **Don't change this.**
   - **description** — where the text appears and what any `{placeholder}` means.
   - **en**, **he** — the actual words, one column per language. Edit these.
3. Anything in curly braces like `{count}` is filled in by the app (e.g. the number
   of queens left). Keep it exactly as-is; the words around it can move.
4. A cell that says `TODO` or is blank means "not translated yet."
5. Save as CSV (Excel/Sheets: File → Save as / Download → `.csv`), keeping the name
   `tokens.csv`.
6. Tell a developer to run the regenerate command below (or do it yourself if you
   have Python).

## Regenerate the app's copy (one command)

```bash
python tokens/generate.py tokens/tokens.csv --out tokens/locales
```

This rewrites the machine files in `locales/` that the app reads. It also prints
which cells are still untranslated. **Never edit the files in `locales/` by hand** —
they're overwritten every time.

## Adding a language

Add one column to `tokens.csv` with the language's ISO code as the header (e.g. `es`,
`fr`), fill in the cells, and regenerate. That's it.

> Note: Hebrew (`he`) is right-to-left. The columns exist, but the app doesn't have
> RTL layout yet, so Hebrew won't display correctly until that's added.

## For developers

`src/i18n.ts` exposes `t('some.key')` (and `t('key', { count: 3 })` for placeholders).
It reads `locales/en.json` with English as the fallback. All user-facing text — every
component, `App.tsx`, and the status/log messages in `useQueens.ts` — now goes through
`t()`; there are no hard-coded UI strings left. Inline emphasis in the education panel
uses `**bold**` / `*italic*` markers in the CSV, rendered by `src/components/RichText.tsx`.

Round-trip back to CSV (after code adds new keys) with:

```bash
python tokens/generate.py tokens/locales --to-csv tokens/tokens.csv
```
