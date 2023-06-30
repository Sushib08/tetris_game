import React from "react";
import { Menu } from "../components/Menu";
import { Tetris } from "../components/Tetris";

// Hooks
import { useGameOver } from "../hooks/useGameOver";

export const Game = ({ rows, columns }) => {
  const start = () => {
    resetGameOver();
  };

  const [gameOver, setGameOver, resetGameOver] = useGameOver("");
  return (
    <div className="Game">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
};
