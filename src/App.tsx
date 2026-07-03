import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { Legend } from './components/Legend';
import { EducationPanel } from './components/EducationPanel';
import { Confetti } from './components/Confetti';
import { useQueens } from './hooks/useQueens';

export default function App() {
  const {
    queens,
    threats,
    mode,
    solutionIndex,
    totalSolutions,
    showConfetti,
    message,
    toggleQueen,
    clear,
    showSolution,
    nextSolution,
    prevSolution,
  } = useQueens();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8 px-4 gap-4">
      <Confetti active={showConfetti} />

      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#4a7c4a] tracking-tight">
          ♟️ 8 Queens
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Can you place 8 queens so none can attack each other?
        </p>
      </div>

      {/* Message */}
      <div className="w-full max-w-[520px] min-h-[52px] flex items-center justify-center text-center bg-[#f0fdf0] border border-[#7CCD7C] rounded-lg px-4 py-3">
        <p className="text-base font-semibold text-[#4a7c4a]">{message}</p>
      </div>

      {/* Education */}
      <EducationPanel />

      {/* Board */}
      <Board
        queens={queens}
        threats={threats}
        onCellClick={toggleQueen}
        interactive={mode === 'manual'}
      />

      {/* Legend */}
      <Legend />

      {/* Controls */}
      <Controls
        mode={mode}
        solutionIndex={solutionIndex}
        totalSolutions={totalSolutions}
        onClear={clear}
        onSolve={showSolution}
        onNext={nextSolution}
        onPrev={prevSolution}
      />
    </div>
  );
}
