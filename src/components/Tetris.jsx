import React from "react";
import { Board } from "../components/Board";
import GameStats from "../components/GameStats";
import "./styles/Tetris.css";

// Hook
import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";

export const Tetris = ({ rows, columns, setGameOver }) => {
  const [board, setBoard] = useBoard({ rows, columns });
  const [gameStats, addLinesCleared] = useGameStats();
  return (
    <div className="Tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
    </div>
  );
};
