import { useState, useCallback } from "react";

import { randomTetromino } from "../target_project/Tetrominoes";

/**
 * Hook personnalisé pour gérer le joueur dans le jeu Tetris.
 * Ce hook initialise le joueur avec un tétris aléatoire et retourne le joueur ainsi que des fonctions pour le mettre à jour.
 * @returns Un tableau contenant le joueur, la fonction pour le mettre à jour et la fonction pour réinitialiser le joueur.
 */
export const usePlayer = () => {
  const [player, setPlayer] = useState(buildPlayer());

  /**
   * Fonction pour réinitialiser le joueur.
   * Cette fonction est créée avec useCallback pour garantir sa stabilité entre les rendus.
   */
  const resetPlayer = useCallback(() => {
    setPlayer((prev) => buildPlayer(prev));
  }, []);

  return [player, setPlayer, resetPlayer];
};

/**
 * Fonction pour construire le joueur.
 * @param previous - L'état précédent du joueur.
 * @returns Le joueur initialisé avec un tétris aléatoire.
 */
const buildPlayer = (previous) => {
  let tetrominoes;

  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino());
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map((_) => randomTetromino());
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop(),
  };
};
