import { Board } from './components/Board';
import { Scoresheet } from './components/Scoresheet';
import { Legend } from './components/Legend';
import { EducationPanel } from './components/EducationPanel';
import { Confetti } from './components/Confetti';
import { useQueens } from './hooks/useQueens';

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

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12">
      <Confetti active={showConfetti} />

      <header className="mx-auto grid max-w-[980px] items-start gap-6 border-b border-line pb-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">
            A chess puzzle | est. 1848
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            Eight Queens
          </h1>
          <p className="mt-3 max-w-lg font-display text-base italic text-sage">
            Place eight queens so no two share a row, a column, or a diagonal.
            The table keeps score.
          </p>
        </div>
        <EducationPanel />
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
            source on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
