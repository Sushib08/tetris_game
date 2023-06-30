import React from "react";
import { Menu } from "../components/Menu";

// Hooks
import { useGameOver } from "../hooks/useGameOver";

export const Game = ({ rows, columns }) => {
  const start = () => {
    console.log(`Start gameOver is ${gameOver}`);
  };

  const [gameOver, setGameOver, resetGameOver] = useGameOver("");
  return (
    <div className="Game">
      <Menu onClick={start} />
    </div>
  );
};
