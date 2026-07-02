import { Cell } from './Cell';
import type { Queen } from '../hooks/useQueens';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];

type Props = {
  queens: Queen[];
  threats: number[][];
  onCellClick: (col: number, row: number) => void;
  interactive: boolean;
};

export function Board({ queens, threats, onCellClick, interactive }: Props) {
  const queenSet = new Set(queens.map(q => `${q.col}_${q.row}`));

  return (
    <div className="flex flex-col items-center select-none">
      {/* Column labels */}
      <div className="flex ml-8 mb-1">
        {FILES.map(f => (
          <div key={f} className="w-[58px] text-center text-sm text-gray-500 font-medium border border-white">{f}</div>
        ))}
      </div>

      <div className="flex">
        {/* Row labels */}
        <div className="flex flex-col mr-1">
          {RANKS.map(r => (
            <div key={r} className="h-[58px] w-6 flex items-center justify-center text-sm text-gray-500 font-medium border border-white">{r}</div>
          ))}
        </div>

        {/* Grid */}
        <div
          role="grid"
          aria-label="8 queens chess board"
          className="border border-[#6C7B8B]"
        >
          {Array.from({ length: 8 }, (_, row) => (
            <div key={row} role="row" className="flex">
              {Array.from({ length: 8 }, (_, col) => (
                <Cell
                  key={`${col}_${row}`}
                  col={col}
                  row={row}
                  isLight={(col + row) % 2 === 0}
                  hasQueen={queenSet.has(`${col}_${row}`)}
                  threats={threats[row]?.[col] ?? 0}
                  onClick={onCellClick}
                  interactive={interactive}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
