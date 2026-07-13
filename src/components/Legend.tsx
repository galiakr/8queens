import { t } from '../i18n';

type Swatch = {
  labelKey: string;
  light: string;
  dark: string;
};

const SWATCHES: Swatch[] = [
  { labelKey: 'legend.no_threat', light: '#98FB98', dark: '#7CCD7C' },
  { labelKey: 'legend.threat_one', light: '#FFEC8B', dark: '#CDBE70' },
  { labelKey: 'legend.threat_many', light: '#FFB6C1', dark: '#CD8C95' },
];

export function Legend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-sage">
      {SWATCHES.map(({ labelKey, light, dark }) => (
        <div key={labelKey} className="flex items-center gap-1.5">
          <span className="flex overflow-hidden rounded border border-cream/20">
            <span className="h-3.5 w-3.5" style={{ backgroundColor: light }} />
            <span className="h-3.5 w-3.5" style={{ backgroundColor: dark }} />
          </span>
          <span>{t(labelKey)}</span>
        </div>
      ))}
    </div>
  );
}
