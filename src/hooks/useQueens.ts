import { useState, useCallback, useRef } from 'react';
import { findAllSolutions, buildThreatMap } from '../utils/solver';
import { t } from '../i18n';
import type { GameMode, LogEntry, MessageTone, Solution } from '../types';

export type Queen = { col: number; row: number };

const ALL_SOLUTIONS = findAllSolutions(); // computed once

const square = (col: number, row: number) => `${'abcdefgh'[col]}${row + 1}`;

// Remaining queens to place, with singular/plural handled via separate tokens.
const queensLeftMsg = (left: number) =>
  t(left === 1 ? 'status.queens_left_one' : 'status.queens_left_other', {
    count: left,
  });

export function useQueens() {
  const [queens, setQueens] = useState<Queen[]>([]);
  const [mode, setMode] = useState<GameMode>('manual');
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [animatingQueens, setAnimatingQueens] = useState<Queen[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState(t('status.start'));
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
    setMessage(t('status.start'));
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
          queens.length - 1 === 0
            ? t('status.start')
            : queensLeftMsg(8 - (queens.length - 1)),
        );
        setMessageTone('neutral');
        setLog((p) => [
          ...p,
          {
            text: `–Q${square(col, row)}`,
            note: t('log.retired'),
            tone: 'neutral',
          },
        ]);
        return;
      }

      if (queens.length >= 8) {
        setMessage(t('status.board_full'));
        setMessageTone('warn');
        return;
      }

      if (threats[row][col] > 0) {
        setMessage(t('status.under_attack'));
        setMessageTone('warn');
        setLog((p) => [
          ...p,
          {
            text: `Q${square(col, row)}??`,
            note: t('log.under_attack'),
            tone: 'warn',
          },
        ]);
        return;
      }

      const next = [...queens, { col, row }];
      setQueens(next);

      if (next.length === 8) {
        setMessage(t('status.solved'));
        setMessageTone('win');
        setLog((p) => [
          ...p,
          { text: `Q${square(col, row)}`, note: '1–0', tone: 'win' },
        ]);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3500);
      } else {
        setMessage(queensLeftMsg(8 - next.length));
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
      setMessage(t('status.solving'));
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
              setMessage(t('status.solved'));
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
