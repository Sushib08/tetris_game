import React from "react";
import { Board } from "../components/Board";
import "./styles/Tetris.css";

// Hook
import { useBoard } from "../hooks/useBoard";

export const Tetris = ({ rows, columns, setGameOver }) => {
  const [board, setBoard] = useBoard({ rows, columns });
  return <Board board={board} />;
};
