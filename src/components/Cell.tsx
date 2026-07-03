type Props = {
  col: number;
  row: number;
  isLight: boolean;
  hasQueen: boolean;
  threats: number;
  onClick: (col: number, row: number) => void;
  interactive: boolean;
};

export function Cell({ col, row, isLight, hasQueen, threats, onClick, interactive }: Props) {
  const base = isLight ? 'bg-[#98FB98]' : 'bg-[#7CCD7C]';

  const highlight =
    hasQueen
      ? 'bg-white border-2 border-[#CD8C95]'
      : threats === 1
      ? isLight
        ? 'bg-[#FFEC8B] border-[#CDBE70]'
        : 'bg-[#CDBE70] border-[#CDBE70]'
      : threats > 1
      ? isLight
        ? 'bg-[#FFB6C1] border-[#CD8C95]'
        : 'bg-[#CD8C95] border-[#CD8C95]'
      : '';

  return (
    <div
      role="gridcell"
      aria-label={`Column ${col + 1}, Row ${row + 1}${hasQueen ? ', queen' : threats > 0 ? ', threatened' : ''}`}
      tabIndex={interactive ? 0 : -1}
      onClick={() => interactive && onClick(col, row)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && interactive && onClick(col, row)}
      className={[
        'w-[var(--cell-size)] h-[var(--cell-size)] flex items-center justify-center border border-white',
        'transition-colors duration-150 select-none',
        base,
        highlight,
        interactive ? 'cursor-pointer hover:border-[#008B45] focus:outline-none focus:ring-2 focus:ring-[#008B45]' : 'cursor-default',
      ].join(' ')}
    >
      {hasQueen && (
        <img
          src={`${import.meta.env.BASE_URL}squeen.png`}
          alt="queen"
          className="w-[70%] h-[70%] object-contain pointer-events-none"
        />
      )}
    </div>
  );
}
