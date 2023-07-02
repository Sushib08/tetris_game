import { useEffect, useState } from "react";

// Target
import { buildBoard, nextBoard } from "../target_project/Board";

/**
 * Hook personnalisé pour gérer le plateau de jeu dans le jeu Tetris.
 * Ce hook initialise le plateau de jeu avec les lignes et colonnes spécifiées, et met à jour le plateau à chaque changement de joueur.
 * @param {Object} options - Les options du jeu.
 * @param {number} options.rows - Le nombre de lignes du plateau de jeu.
 * @param {number} options.columns - Le nombre de colonnes du plateau de jeu.
 * @param {Object} options.player - Le joueur actuel.
 * @param {Function} options.resetPlayer - La fonction pour réinitialiser le joueur.
 * @param {Function} options.addLinesCleared - La fonction pour ajouter des lignes complétées.
 * @returns Un tableau contenant le plateau de jeu.
 */
export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared,
      })
    );
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};
