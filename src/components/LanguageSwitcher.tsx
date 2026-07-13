import { LANGS, type Lang } from '../i18n';

const LABELS: Record<Lang, string> = { en: 'en', he: 'עב' };

type Props = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

export function LanguageSwitcher({ lang, onChange }: Props) {
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.18em]"
    >
      {LANGS.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="text-sage/40">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => onChange(l)}
            aria-pressed={lang === l}
            lang={l}
            className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
              lang === l ? 'text-cream' : 'text-sage hover:text-cream'
            }`}
          >
            {LABELS[l]}
          </button>
        </div>
      ))}
    </div>
  );
}
