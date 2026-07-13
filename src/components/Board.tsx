import { Cell } from './Cell';
import { t } from '../i18n';
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
  const queenSet = new Set(queens.map((q) => `${q.col}_${q.row}`));

  return (
    <div
      className="flex flex-col items-center select-none w-full max-w-[520px]"
      style={
        {
          '--cell-size': 'clamp(28px, calc((100vw - 52px) / 8), 58px)',
          '--label-size': 'clamp(18px, 4.5vw, 24px)',
        } as React.CSSProperties
      }
    >
      {/* Column labels */}
      <div
        className="flex mb-1"
        style={{ marginLeft: 'calc(var(--label-size) + 4px)' }}
      >
        {FILES.map((f) => (
          <div
            key={f}
            className="w-[var(--cell-size)] text-center font-mono text-xs text-sage"
          >
            {f}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Row labels */}
        <div className="flex flex-col">
          {RANKS.map((r) => (
            <div
              key={r}
              className="h-[var(--cell-size)] w-[var(--label-size)] flex items-center justify-center font-mono text-xs text-sage"
            >
              {r}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div
          role="grid"
          aria-label={t('board.aria')}
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
