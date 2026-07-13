import { Board } from './components/Board';
import { Scoresheet } from './components/Scoresheet';
import { Legend } from './components/Legend';
import { EducationPanel } from './components/EducationPanel';
import { useEffect, useState } from 'react';
import { Confetti } from './components/Confetti';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useQueens } from './hooks/useQueens';
import { getLang, setLang, t, type Lang } from './i18n';

export default function App() {
  const {
    queens,
    threats,
    mode,
    solutionIndex,
    totalSolutions,
    showConfetti,
    message,
    messageTone,
    log,
    toggleQueen,
    clear,
    showSolution,
    nextSolution,
    prevSolution,
  } = useQueens();

  const [lang, setLangState] = useState<Lang>(getLang());

  // Keep the document's language and text direction in sync with the choice.
  // NOTE: RTL layout for Hebrew is not implemented yet — see the tracking issue.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }, [lang]);

  const changeLang = (next: Lang) => {
    setLang(next);
    setLangState(next);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12">
      <Confetti active={showConfetti} />

      <header className="mx-auto grid max-w-[980px] items-start gap-6 border-b border-line pb-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">
            {t('app.eyebrow')}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            {t('app.title')}
          </h1>
          <p className="mt-3 max-w-lg font-display text-base italic text-sage">
            {t('app.tagline')}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <LanguageSwitcher lang={lang} onChange={changeLang} />
          <EducationPanel />
        </div>
      </header>

      <main className="mx-auto mt-8 grid max-w-[980px] items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="flex flex-col items-center gap-5">
          <Board
            queens={queens}
            threats={threats}
            onCellClick={toggleQueen}
            interactive={mode === 'manual'}
          />
          <Legend />
        </section>

        <aside className="flex flex-col gap-6">
          <Scoresheet
            log={log}
            queensPlaced={queens.length}
            message={message}
            messageTone={messageTone}
            mode={mode}
            solutionIndex={solutionIndex}
            totalSolutions={totalSolutions}
            onClear={clear}
            onSolve={showSolution}
            onNext={nextSolution}
            onPrev={prevSolution}
          />
        </aside>
      </main>

      <footer className="mx-auto mt-10 max-w-[980px] border-t border-line pt-4">
        <p className="text-center font-mono text-[11px] text-sage">
          <a
            href="https://github.com/galiakr/8queens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mint underline underline-offset-2 hover:text-cream"
          >
            {t('app.source_link')}
          </a>
        </p>
      </footer>
    </div>
  );
}
