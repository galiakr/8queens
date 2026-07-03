type Props = {
  mode: string;
  solutionIndex: number;
  totalSolutions: number;
  onClear: () => void;
  onSolve: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export function Controls({
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

  const btnBase =
    'px-4 py-2 rounded font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#008B45]';
  const btnPrimary = `${btnBase} bg-[#7CCD7C] hover:bg-[#5cb85c] text-white disabled:opacity-40 disabled:cursor-not-allowed`;
  const btnSecondary = `${btnBase} border border-[#6C7B8B] text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`;

  return (
    <div className="w-full max-w-[520px] space-y-3">
      {/* Main buttons */}
      <div className="flex gap-2 flex-wrap justify-center">
        <button className={btnSecondary} onClick={onClear}>
          Clear board
        </button>
        <button
          className={btnPrimary}
          onClick={onSolve}
          disabled={isSolving}
        >
          {isSolving ? 'Solving…' : 'Show solution'}
        </button>
      </div>

      {/* Solution navigator */}
      {(isBrowsing || isSolving) && (
        <div className="flex items-center justify-center gap-3">
          <button
            className={btnSecondary}
            onClick={onPrev}
            disabled={isSolving}
            aria-label="Previous solution"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-500 min-w-[110px] text-center">
            Solution {solutionIndex + 1} of {totalSolutions}
          </span>
          <button
            className={btnSecondary}
            onClick={onNext}
            disabled={isSolving}
            aria-label="Next solution"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
