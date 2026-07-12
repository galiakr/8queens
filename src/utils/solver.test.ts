import { describe, it, expect } from 'vitest';
import { isSafe, findAllSolutions, buildThreatMap } from './solver';

describe('isSafe', () => {
  it('returns true when no queens placed yet', () => {
    expect(isSafe([], 0, 0)).toBe(true);
  });

  it('returns false when same row is threatened', () => {
    expect(isSafe([3], 1, 3)).toBe(false);
  });

  it('returns false when diagonal is threatened', () => {
    expect(isSafe([0], 1, 1)).toBe(false); // diagonal from (col=0, row=0)
  });

  it('returns true when position is safe', () => {
    expect(isSafe([0], 1, 2)).toBe(true);
  });

  it('detects conflicts with any previously placed queen, not just the first', () => {
    // queens at (col 0, row 0) and (col 1, row 2); (col 2, row 1) is diagonal to the second
    expect(isSafe([0, 2], 2, 1)).toBe(false);
  });
});

describe('findAllSolutions', () => {
  const solutions = findAllSolutions();

  it('finds exactly 92 solutions', () => {
    expect(solutions).toHaveLength(92);
  });

  it('every solution has 8 queens', () => {
    solutions.forEach((s) => expect(s).toHaveLength(8));
  });

  it('every solution has queens in valid rows (0-7)', () => {
    solutions.forEach((s) => {
      s.forEach((row) => {
        expect(row).toBeGreaterThanOrEqual(0);
        expect(row).toBeLessThanOrEqual(7);
      });
    });
  });

  it('every solution has no two queens in the same row', () => {
    solutions.forEach((s) => {
      expect(new Set(s).size).toBe(8);
    });
  });

  it('contains no duplicate solutions', () => {
    expect(new Set(solutions.map((s) => s.join(','))).size).toBe(92);
  });

  it('every solution has no diagonal conflicts', () => {
    solutions.forEach((s) => {
      for (let c1 = 0; c1 < 8; c1++) {
        for (let c2 = c1 + 1; c2 < 8; c2++) {
          expect(Math.abs(c1 - c2)).not.toBe(Math.abs(s[c1] - s[c2]));
        }
      }
    });
  });
});

describe('buildThreatMap', () => {
  it('returns empty threat map when no queens placed', () => {
    const map = buildThreatMap([]);
    map.forEach((row) => row.forEach((cell) => expect(cell).toBe(0)));
  });

  it('marks the correct row as threatened', () => {
    const map = buildThreatMap([{ col: 0, row: 0 }]);
    // Same row, next column should be threatened
    expect(map[0][1]).toBeGreaterThan(0);
  });

  it('marks diagonals as threatened', () => {
    const map = buildThreatMap([{ col: 0, row: 0 }]);
    expect(map[1][1]).toBeGreaterThan(0); // diagonal
  });

  it('does not mark the queen cell itself', () => {
    const map = buildThreatMap([{ col: 3, row: 3 }]);
    expect(map[3][3]).toBe(0);
  });

  it('marks the correct column as threatened', () => {
    const map = buildThreatMap([{ col: 0, row: 0 }]);
    expect(map[1][0]).toBeGreaterThan(0);
  });

  it('counts threats from multiple queens on a shared cell', () => {
    const map = buildThreatMap([
      { col: 0, row: 0 },
      { col: 7, row: 0 },
    ]);
    // (col 3, row 0) sits on the shared row, attacked by both queens
    expect(map[0][3]).toBe(2);
  });
});
