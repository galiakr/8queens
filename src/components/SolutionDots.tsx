type Props = {
  total: number;
  active: number;
  lit: boolean;
};

/**
 * One ink dot per solution — the puzzle's famous 92, punched into the sheet.
 * Purely decorative; the accessible counter lives in Scoresheet.
 */
export function SolutionDots({ total, active, lit }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-wrap justify-center gap-[5px] transition-opacity duration-300 ${
        lit ? 'opacity-100' : 'opacity-50'
      }`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-[6px] w-[6px] rounded-full transition-colors ${
            lit && i === active ? 'scale-125 bg-ink' : 'bg-ink/15'
          }`}
        />
      ))}
    </div>
  );
}
