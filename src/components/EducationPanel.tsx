import { useState } from 'react';

export function EducationPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[520px] border border-[#6C7B8B] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#f0fdf0] hover:bg-[#e0f9e0] transition-colors text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#4a7c4a] text-sm">
          ♟️ What is the 8 Queens puzzle?
        </span>
        <span className="text-[#7CCD7C] text-lg">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="px-4 py-4 bg-white text-sm text-gray-700 space-y-3 leading-relaxed">
          <p>
            The challenge: place <strong>8 queens</strong> on a chessboard so
            that no queen can attack any other. A queen attacks every square on
            her row, column, and both diagonals.
          </p>

          <div className="bg-[#f0fdf0] rounded p-3 border-l-4 border-[#7CCD7C]">
            <p className="font-semibold text-[#4a7c4a] mb-1">
              How the solver works — Backtracking
            </p>
            <p>
              The computer places queens one column at a time. If a position is
              safe, it tries the next column. If it gets stuck, it{' '}
              <em>backtracks</em> — removes the last queen and tries a different
              row. This continues until all 8 queens are placed safely.
            </p>
          </div>

          <div className="bg-[#fff9f0] rounded p-3 border-l-4 border-[#FFEC8B]">
            <p className="font-semibold text-[#8a7a30] mb-1">Did you know?</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                There are exactly <strong>92 solutions</strong> to the 8 Queens
                puzzle
              </li>
              <li>
                If you count rotations and reflections as the same, there are
                only <strong>12 truly different</strong> solutions
              </li>
              <li>
                The puzzle was first published in a chess magazine in{' '}
                <strong>1848</strong>
              </li>
              <li>
                For an n×n board with n queens, finding solutions gets{' '}
                <em>very</em> hard as n grows. It's used to teach algorithms in
                computer science
              </li>
            </ul>
          </div>

          <p className="text-xs text-gray-400">
            🌐{' '}
            <a
              href="https://en.wikipedia.org/wiki/Eight_queens_puzzle"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#7CCD7C]"
            >
              Read more on Wikipedia
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
