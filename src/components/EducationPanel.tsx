import { useState } from 'react';

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
          <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
            From the archive
          </span>
          <span className="mt-1 block font-display text-base font-semibold">
            What is the Eight Queens puzzle?
          </span>
        </span>
        <span aria-hidden="true" className="font-mono text-lg text-ink/60">
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-20 max-h-[70vh] space-y-4 overflow-y-auto rounded-b-sm bg-parchment px-5 pb-5 pt-1 text-sm leading-relaxed text-ink/80 shadow-[0_12px_28px_rgba(0,0,0,0.55)]">
          <p>
            The challenge: place <strong className="text-ink">8 queens</strong>{' '}
            on a chessboard so that no queen can attack any other. A queen
            attacks every square on her row, column, and both diagonals.
          </p>

          <div className="border-l-2 border-club pl-3">
            <p className="mb-1 font-medium text-ink">
              How the solver works — backtracking
            </p>
            <p>
              The computer places queens one column at a time. If a position is
              safe, it tries the next column. If it gets stuck, it{' '}
              <em>backtracks</em> — removes the last queen and tries a different
              row. This continues until all 8 queens are placed safely.
            </p>
          </div>

          <div className="border-l-2 border-brass pl-3">
            <p className="mb-1 font-medium text-ink">Did you know?</p>
            <ul className="list-inside list-disc space-y-1 marker:text-brass">
              <li>
                There are exactly{' '}
                <strong className="text-ink">92 solutions</strong> to the Eight
                Queens puzzle
              </li>
              <li>
                If you count rotations and reflections as the same, there are
                only <strong className="text-ink">12 truly different</strong>{' '}
                solutions
              </li>
              <li>
                The puzzle was first published in the{' '}
                <em>Berliner Schachzeitung</em> in{' '}
                <strong className="text-ink">1848</strong>
              </li>
              <li>
                For an n×n board with n queens, finding solutions gets{' '}
                <em>very</em> hard as n grows. It's used to teach algorithms in
                computer science
              </li>
            </ul>
          </div>

          <p className="flex items-baseline justify-between font-mono text-[11px] text-ink/60">
            <a
              href="https://en.wikipedia.org/wiki/Eight_queens_puzzle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-club underline underline-offset-2 hover:text-ink"
            >
              Read more on Wikipedia
            </a>
            <span className="italic">Schachzeitung, 1848</span>
          </p>
        </div>
      )}
    </div>
  );
}
