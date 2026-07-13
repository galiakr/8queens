// Minimal, zero-dependency token lookup.
// Source of truth is tokens/tokens.csv — edit that, then regenerate:
//   python tokens/generate.py tokens/tokens.csv --out tokens/locales
// Do not edit the JSON under tokens/locales by hand.
import en from '../tokens/locales/en.json';
import he from '../tokens/locales/he.json';

type Dict = Record<string, unknown>;

const LOCALES: Record<string, Dict> = { en, he };
const FALLBACK = 'en';

export const LANGS = ['en', 'he'] as const;
export type Lang = (typeof LANGS)[number];

function readInitial(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved && saved in LOCALES) return saved as Lang;
  } catch {
    /* localStorage unavailable (SSR, privacy mode) — fall back */
  }
  return 'en';
}

let activeLang: Lang = readInitial();

export function getLang(): Lang {
  return activeLang;
}

export function setLang(lang: Lang): void {
  activeLang = lang;
  try {
    localStorage.setItem('lang', lang);
  } catch {
    /* ignore */
  }
}

function lookup(dict: Dict, dottedKey: string): string | undefined {
  let node: unknown = dict;
  for (const part of dottedKey.split('.')) {
    if (typeof node !== 'object' || node === null) return undefined;
    node = (node as Dict)[part];
  }
  return typeof node === 'string' ? node : undefined;
}

/**
 * Look up a token by key, falling back to English, then to the key itself.
 * Fill placeholders with `vars`: t('scoresheet.counter', { index: 1, total: 92 }).
 */
export function t(key: string, vars?: Record<string, string | number>): string {
  const raw =
    lookup(LOCALES[activeLang] ?? {}, key) ??
    lookup(LOCALES[FALLBACK], key) ??
    key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (whole, name) =>
    name in vars ? String(vars[name]) : whole,
  );
}
