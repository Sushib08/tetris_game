import React from "react";
import { Board } from "../components/Board";
import GameStats from "../components/GameStats";
import Previews from "../components/Previews";
import GameController from "./GameController";
import "./styles/Tetris.css";

// Hook
import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";

/**
 * Composant Tetris qui représente le jeu Tetris.
 * Ce composant utilise les hooks personnalisés pour gérer l'état du joueur, les statistiques du jeu et le plateau de jeu.
 * @param {number} rows - Le nombre de lignes du plateau de jeu.
 * @param {number} columns - Le nombre de colonnes du plateau de jeu.
 * @param {Function} setGameOver - La fonction pour définir l'état de fin de jeu.
 * @returns Le composant Tetris.
 */
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
