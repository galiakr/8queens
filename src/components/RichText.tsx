import type { ReactNode } from 'react';

// Renders a token string with minimal inline emphasis: **bold** and *italic*.
// Keeps translators editing one coherent sentence (with simple markers) instead
// of fragmenting it across tokens, and avoids dangerouslySetInnerHTML.
export function RichText({ text }: { text: string }) {
  return <>{parse(text)}</>;
}

function parse(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Match **bold** first, then *italic*.
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={i++}>{match[1]}</strong>);
    } else {
      nodes.push(<em key={i++}>{match[2]}</em>);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
