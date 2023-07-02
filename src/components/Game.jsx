import React from "react";
import { Menu } from "../components/Menu";
import { Tetris } from "../components/Tetris";

// Hooks
import { useGameOver } from "../hooks/useGameOver";

/**
 * Composant représentant le jeu Tetris.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.rows - Le nombre de lignes du tableau de jeu.
 * @param {number} props.columns - Le nombre de colonnes du tableau de jeu.
 * @returns {JSX.Element} - L'élément du jeu Tetris.
 */
export const Game = ({ rows, columns }) => {
  /**
   * Fonction de démarrage du jeu.
   * Cette fonction est appelée lorsque le bouton de démarrage est cliqué.
   */
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
