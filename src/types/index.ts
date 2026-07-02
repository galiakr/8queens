export type CellState = {
  hasQueen: boolean;
  threats: number; // number of queens threatening this cell
};

export type Board = CellState[][];

export type Solution = number[]; // index = col, value = row

export type GameMode = 'manual' | 'solving' | 'browsing';
