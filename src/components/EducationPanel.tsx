import { useState } from 'react';
import { RichText } from './RichText';
import { AttackDiagram } from './AttackDiagram';
import { t } from '../i18n';

const FACTS = ['edu.fact_92', 'edu.fact_12', 'edu.fact_1848', 'edu.fact_hard'];

export function EducationPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-30 rounded-sm bg-parchment text-ink shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-sm px-5 py-4 text-left transition-colors hover:bg-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-parchment"
      >
        <span>
          <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
            {t('edu.eyebrow')}
          </span>
          <span className="mt-1 block font-display text-base font-semibold">
            {t('edu.title')}
          </span>
        </span>
        <span aria-hidden="true" className="font-mono text-lg text-ink/70">
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-20 max-h-[70vh] space-y-4 overflow-y-auto rounded-b-sm bg-parchment px-5 pb-5 pt-1 text-sm leading-relaxed text-ink/80 shadow-[0_12px_28px_rgba(0,0,0,0.55)] [&_em]:italic [&_strong]:font-semibold [&_strong]:text-ink">
          <p>
            <RichText text={t('edu.intro')} />
          </p>

          <AttackDiagram />

          <div className="border-l-2 border-club pl-3">
            <p className="mb-1 font-medium text-ink">
              {t('edu.backtracking_title')}
            </p>
            <p>
              <RichText text={t('edu.backtracking_body')} />
            </p>
          </div>

          <div className="border-l-2 border-brass pl-3">
            <p className="mb-1 font-medium text-ink">{t('edu.facts_title')}</p>
            <ul className="list-inside list-disc space-y-1 marker:text-brass">
              {FACTS.map((key) => (
                <li key={key}>
                  <RichText text={t(key)} />
                </li>
              ))}
            </ul>
          </div>

          <p className="flex items-baseline justify-between font-mono text-[11px] text-ink/70">
            <a
              href="https://en.wikipedia.org/wiki/Eight_queens_puzzle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-club underline underline-offset-2 hover:text-ink"
            >
              {t('edu.wikipedia')}
            </a>
            <span className="italic">{t('edu.attribution')}</span>
          </p>
        </div>
      )}
    </div>
  );
}
