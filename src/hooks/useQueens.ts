import { useState, useCallback, useRef } from 'react';
import { findAllSolutions, buildThreatMap } from '../utils/solver';
import type { GameMode, LogEntry, MessageTone, Solution } from '../types';

export type Queen = { col: number; row: number };

const ALL_SOLUTIONS = findAllSolutions(); // computed once

const square = (col: number, row: number) => `${'abcdefgh'[col]}${row + 1}`;

export function useQueens() {
  const [queens, setQueens] = useState<Queen[]>([]);
  const [mode, setMode] = useState<GameMode>('manual');
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [animatingQueens, setAnimatingQueens] = useState<Queen[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState(
    'Place 8 queens so none can attack each other',
  );
  const [messageTone, setMessageTone] = useState<MessageTone>('neutral');
  const [log, setLog] = useState<LogEntry[]>([]);
  const solveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const threats = buildThreatMap(queens);

  const clear = useCallback(() => {
    if (solveTimerRef.current) clearTimeout(solveTimerRef.current);
    setQueens([]);
    setAnimatingQueens([]);
    setMode('manual');
    setShowConfetti(false);
    setMessage('Place 8 queens so none can attack each other');
    setMessageTone('neutral');
    setLog([]);
  }, []);

  const toggleQueen = useCallback(
    (col: number, row: number) => {
      if (mode !== 'manual') return;

      const existing = queens.find((q) => q.col === col && q.row === row);

      if (existing) {
        setQueens((prev) =>
          prev.filter((q) => !(q.col === col && q.row === row)),
        );
        setMessage(
          `${queens.length - 1 === 0 ? 'Place 8 queens so none can attack each other' : `${8 - (queens.length - 1)} queens left`}`,
        );
        setMessageTone('neutral');
        setLog((p) => [
          ...p,
          { text: `–Q${square(col, row)}`, note: 'retired', tone: 'neutral' },
        ]);
        return;
      }

      if (queens.length >= 8) {
        setMessage('Board is full — remove a queen first');
        setMessageTone('warn');
        return;
      }

      if (threats[row][col] > 0) {
        setMessage("Can't place here — this cell is under attack");
        setMessageTone('warn');
        setLog((p) => [
          ...p,
          {
            text: `Q${square(col, row)}??`,
            note: 'under attack',
            tone: 'warn',
          },
        ]);
        return;
      }

      const next = [...queens, { col, row }];
      setQueens(next);

      if (next.length === 8) {
        setMessage('🎉 Solved! All 8 queens are safe!');
        setMessageTone('win');
        setLog((p) => [
          ...p,
          { text: `Q${square(col, row)}`, note: '1–0', tone: 'win' },
        ]);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3500);
      } else {
        setMessage(
          `${8 - next.length} queen${8 - next.length === 1 ? '' : 's'} left`,
        );
        setMessageTone('neutral');
        setLog((p) => [
          ...p,
          { text: `Q${square(col, row)}`, tone: 'neutral' },
        ]);
      }
    },
    [queens, threats, mode],
  );

  const animateSolution = useCallback(
    (solution: Solution) => {
      clear();
      setMode('solving');
      setMessage('Solving…');
      setMessageTone('neutral');

      solution.forEach((row, col) => {
        solveTimerRef.current = setTimeout(() => {
          setLog((p) => [
            ...p,
            {
              text: `Q${square(col, row)}`,
              note: col === 7 ? '1–0' : undefined,
              tone: col === 7 ? 'win' : 'neutral',
            },
          ]);
          setAnimatingQueens((prev) => {
            const next = [...prev, { col, row }];
            if (next.length === 8) {
              setMessage('Solved! All 8 queens are safe!');
              setMessageTone('win');
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 3500);
              setMode('browsing');
            }
            return next;
          });
        }, col * 300);
      });
    },
    [clear],
  );

  const showSolution = useCallback(
    (index: number) => {
      const idx =
        ((index % ALL_SOLUTIONS.length) + ALL_SOLUTIONS.length) %
        ALL_SOLUTIONS.length;
      setSolutionIndex(idx);
      animateSolution(ALL_SOLUTIONS[idx]);
    },
    [animateSolution],
  );

  const nextSolution = useCallback(() => {
    showSolution(solutionIndex + 1);
  }, [solutionIndex, showSolution]);

  const prevSolution = useCallback(() => {
    showSolution(solutionIndex - 1);
  }, [solutionIndex, showSolution]);

  const activeQueens = mode === 'manual' ? queens : animatingQueens;

  return {
    queens: activeQueens,
    threats: buildThreatMap(activeQueens),
    mode,
    solutionIndex,
    totalSolutions: ALL_SOLUTIONS.length,
    showConfetti,
    message,
    messageTone,
    log,
    toggleQueen,
    clear,
    showSolution: () => showSolution(0),
    nextSolution,
    prevSolution,
  };
}
