type Swatch = {
  label: string;
  light: string;
  dark: string;
};

const SWATCHES: Swatch[] = [
  { label: 'No threat', light: '#98FB98', dark: '#7CCD7C' },
  { label: 'Threatened by 1 queen', light: '#FFEC8B', dark: '#CDBE70' },
  { label: 'Threatened by 2+ queens', light: '#FFB6C1', dark: '#CD8C95' },
];

export function Legend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-sage">
      {SWATCHES.map(({ label, light, dark }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="flex overflow-hidden rounded border border-cream/20">
            <span className="h-3.5 w-3.5" style={{ backgroundColor: light }} />
            <span className="h-3.5 w-3.5" style={{ backgroundColor: dark }} />
          </span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
