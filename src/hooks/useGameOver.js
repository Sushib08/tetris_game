import { useCallback, useState } from "react";

/**
 * Hook personnalisé pour gérer l'état de fin de jeu.
 * Ce hook retourne l'état de fin de jeu actuel ainsi que des fonctions pour le mettre à jour.
 * @returns Un tableau contenant l'état de fin de jeu, la fonction pour le mettre à jour et la fonction pour réinitialiser l'état.
 */
export const useGameOver = () => {
  const [gameOver, setGameOver] = useState(true);

  /**
   * Fonction pour réinitialiser l'état de fin de jeu.
   * Cette fonction est créée avec useCallback pour garantir sa stabilité entre les rendus.
   */
  const resetGameOver = useCallback(() => {
    setGameOver(false);
  }, []);

  return [gameOver, setGameOver, resetGameOver];
};
