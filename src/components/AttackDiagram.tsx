import { t } from '../i18n';

// A small monochrome diagram: one queen on a 5x5 board with arrows radiating
// along her row, column, and both diagonals — the squares she attacks.
// Everything is drawn with currentColor so it inherits the panel's ink tone.
const CELL = 34;
const N = 5;
const SIZE = CELL * N; // 170
const MID = SIZE / 2; // centre of the board, where the queen sits
const EDGE = 6; // arrowheads stop just short of the board edge

// The eight attack rays: dx/dy in {-1, 0, 1}, excluding (0, 0).
const RAYS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export function AttackDiagram() {
  return (
    <figure className="m-0 flex flex-col items-center gap-2">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={t('edu.diagram_alt')}
        className="h-auto w-28 text-ink"
      >
        {/* Checkerboard: white and light-grey squares keep it black-and-white. */}
        {Array.from({ length: N * N }, (_, i) => {
          const col = i % N;
          const row = Math.floor(i / N);
          const light = (col + row) % 2 === 0;
          return (
            <rect
              key={i}
              x={col * CELL}
              y={row * CELL}
              width={CELL}
              height={CELL}
              fill={light ? '#ffffff' : '#d9d4c7'}
            />
          );
        })}

        {/* Attack rays from the queen's square out to the board edge. */}
        <g stroke="currentColor" strokeWidth={2} markerEnd="url(#arrow)">
          {RAYS.map(([dx, dy], i) => {
            const mag = Math.hypot(dx, dy);
            // Start just outside the queen glyph.
            const x1 = MID + (dx / mag) * (CELL * 0.55);
            const y1 = MID + (dy / mag) * (CELL * 0.55);
            // End at the board edge (or corner, for diagonals).
            const x2 = dx > 0 ? SIZE - EDGE : dx < 0 ? EDGE : MID;
            const y2 = dy > 0 ? SIZE - EDGE : dy < 0 ? EDGE : MID;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {/* Board outline. */}
        <rect
          x={0.5}
          y={0.5}
          width={SIZE - 1}
          height={SIZE - 1}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />

        {/* The queen. */}
        <text
          x={MID}
          y={MID}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={CELL * 0.8}
          fill="currentColor"
        >
          ♛
        </text>

        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>
      </svg>
      <figcaption className="text-center font-mono text-[11px] text-ink/70">
        {t('edu.diagram_caption')}
      </figcaption>
    </figure>
  );
}
