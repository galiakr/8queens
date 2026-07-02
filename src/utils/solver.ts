import type { Solution } from '../types';

/** Returns true if placing a queen at (col, row) conflicts with any existing queen */
export function isSafe(placed: number[], col: number, row: number): boolean {
  for (let c = 0; c < col; c++) {
    const r = placed[c];
    if (r === row) return false;           // same row
    if (Math.abs(c - col) === Math.abs(r - row)) return false; // diagonal
  }
  return true;
}

/** Find all 92 solutions via backtracking */
export function findAllSolutions(): Solution[] {
  const solutions: Solution[] = [];
  const placed: number[] = [];

  function backtrack(col: number) {
    if (col === 8) {
      solutions.push([...placed]);
      return;
    }
    for (let row = 0; row < 8; row++) {
      if (isSafe(placed, col, row)) {
        placed[col] = row;
        backtrack(col + 1);
        placed.pop();
      }
    }
  }

  backtrack(0);
  return solutions;
}

/** Build threat map for a given set of placed queens
 *  queens: array of {col, row} pairs
 *  returns 8x8 grid of threat counts */
export function buildThreatMap(queens: { col: number; row: number }[]): number[][] {
  const threats: number[][] = Array.from({ length: 8 }, () => Array(8).fill(0));

  for (const { col: qc, row: qr } of queens) {
    const dirs = [
      [0, 1], [0, -1], [1, 0], [-1, 0],
      [1, 1], [1, -1], [-1, 1], [-1, -1],
    ];
    for (const [dr, dc] of dirs) {
      let r = qr + dr;
      let c = qc + dc;
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        threats[r][c]++;
        r += dr;
        c += dc;
      }
    }
  }

  return threats;
}
