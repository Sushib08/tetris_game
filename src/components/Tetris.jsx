import React from "react";
import { Board } from "../components/Board";
import GameStats from "../components/GameStats";
import Previews from "../components/Previews";
import { GameController } from "./GameController";
import "./styles/Tetris.css";

// Hook
import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";

export const Tetris = ({ rows, columns, setGameOver }) => {
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [gameStats, addLinesCleared] = useGameStats();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });

  return (
    <div className="Tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
};
