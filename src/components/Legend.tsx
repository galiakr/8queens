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
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
      {SWATCHES.map(({ label, light, dark }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="flex rounded overflow-hidden border border-white shadow-sm">
            <span className="w-4 h-4" style={{ backgroundColor: light }} />
            <span className="w-4 h-4" style={{ backgroundColor: dark }} />
          </span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
