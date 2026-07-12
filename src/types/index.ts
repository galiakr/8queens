export type CellState = {
  hasQueen: boolean;
  threats: number; // number of queens threatening this cell
};

export type Board = CellState[][];

export type Solution = number[]; // index = col, value = row

export type GameMode = 'manual' | 'solving' | 'browsing';

export type MessageTone = 'neutral' | 'warn' | 'win';

export type LogEntry = {
  text: string; // algebraic notation, e.g. "Qd5", "–Qd5", "Qb1??"
  note?: string;
  tone: MessageTone;
};
