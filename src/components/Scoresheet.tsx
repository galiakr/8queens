import { useEffect, useRef } from 'react';
import { SolutionDots } from './SolutionDots';
import type { LogEntry, MessageTone } from '../types';

type Props = {
  log: LogEntry[];
  queensPlaced: number;
  message: string;
  messageTone: MessageTone;
  mode: string;
  solutionIndex: number;
  totalSolutions: number;
  onClear: () => void;
  onSolve: () => void;
  onNext: () => void;
  onPrev: () => void;
};

const MIN_ROWS = 8;

const toneText: Record<MessageTone, string> = {
  neutral: 'text-ink',
  warn: 'text-pencil',
  win: 'text-club',
};

export function Scoresheet({
  log,
  queensPlaced,
  message,
  messageTone,
  mode,
  solutionIndex,
  totalSolutions,
  onClear,
  onSolve,
  onNext,
  onPrev,
}: Props) {
  const isBrowsing = mode === 'browsing';
  const isSolving = mode === 'solving';
  const inSolutions = isBrowsing || isSolving;

  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log.length]);

  const emptyRows = Math.max(0, MIN_ROWS - log.length);

  const btnForm =
    'rounded-sm px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

  return (
    <div className="rounded-sm bg-cream text-ink shadow-[0_4px_18px_rgba(0,0,0,0.45)] lg:-rotate-[0.4deg]">
      {/* Sheet header */}
      <div className="flex items-center justify-between px-5 pb-3 pt-4">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
          Scoresheet
        </h2>
        <div
          role="img"
          aria-label={`${queensPlaced} of 8 queens placed`}
          className="flex gap-1"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className={`h-3.5 w-3.5 rounded-[3px] border transition-colors duration-300 ${
                i < queensPlaced
                  ? 'border-ink/30 bg-mint'
                  : 'border-ink/20 bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Move log — ruled rows, fills as you play */}
      <div
        ref={logRef}
        className="mx-5 max-h-[272px] overflow-y-auto border-t border-ink/20"
      >
        {log.map((entry, i) => (
          <div
            key={i}
            className="flex items-baseline gap-2 border-b border-ink/10 py-1.5"
          >
            <span className="w-6 shrink-0 text-right font-mono text-xs text-ink/40">
              {i + 1}.
            </span>
            <span
              className={`font-mono text-sm ${
                entry.tone === 'warn' ? 'text-pencil' : 'text-ink'
              }`}
            >
              {entry.text}
            </span>
            {entry.note && (
              <span
                className={`text-xs italic ${
                  entry.tone === 'neutral'
                    ? 'text-ink/50'
                    : toneText[entry.tone]
                }`}
              >
                {entry.note}
              </span>
            )}
          </div>
        ))}
        {Array.from({ length: emptyRows }, (_, i) => (
          <div
            key={`empty-${i}`}
            aria-hidden="true"
            className="flex items-baseline gap-2 border-b border-ink/10 py-1.5"
          >
            <span className="w-6 shrink-0 text-right font-mono text-xs text-ink/25">
              {log.length + i + 1}.
            </span>
            <span className="font-mono text-sm">&nbsp;</span>
          </div>
        ))}
      </div>

      {/* Current annotation */}
      <p
        aria-live="polite"
        className={`min-h-[3.25rem] px-5 pt-2 font-display text-base italic leading-snug transition-colors ${toneText[messageTone]}`}
      >
        {message}
      </p>

      <div className="px-5 pb-4 pt-1">
        <button
          onClick={onClear}
          disabled={mode === 'manual' && queensPlaced === 0}
          className={`${btnForm} w-full border border-ink/30 text-ink hover:bg-ink/5`}
        >
          Clear board
        </button>
      </div>

      {/* Perforation */}
      <div className="border-t border-dashed border-ink/30" />

      {/* Arrangements — the solver's catalogue */}
      <div className="px-5 py-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
            Arrangements
          </h2>
          <p className="font-mono text-xs text-ink/60">
            {inSolutions
              ? `${solutionIndex + 1} / ${totalSolutions}`
              : `${totalSolutions} catalogued`}
          </p>
        </div>

        <button
          onClick={onSolve}
          disabled={isSolving}
          className={`${btnForm} mt-3 w-full bg-ink text-cream hover:bg-ink/85`}
        >
          {isSolving ? 'Placing queens…' : 'Show a solution'}
        </button>

        {inSolutions && (
          <div className="mt-3 flex items-center justify-between gap-2">
            <button
              className={`${btnForm} border border-ink/30 text-ink hover:bg-ink/5`}
              onClick={onPrev}
              disabled={isSolving}
              aria-label="Previous solution"
            >
              ← Prev
            </button>
            <span className="font-mono text-xs text-ink/70">
              No. {solutionIndex + 1} of {totalSolutions}
            </span>
            <button
              className={`${btnForm} border border-ink/30 text-ink hover:bg-ink/5`}
              onClick={onNext}
              disabled={isSolving}
              aria-label="Next solution"
            >
              Next →
            </button>
          </div>
        )}

        <div className="mt-4">
          <SolutionDots
            total={totalSolutions}
            active={solutionIndex}
            lit={inSolutions}
          />
          <p className="mt-3 text-center font-mono text-[11px] text-ink/50">
            Every dot is one valid arrangement.
          </p>
        </div>
      </div>
    </div>
  );
}
