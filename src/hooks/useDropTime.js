import { useCallback, useEffect, useState } from "react";

const defaultDropTime = 1000;
const minimumDropTime = 100;
const speedIncrement = 50;

/**
 * Hook personnalisé pour gérer le temps de chute des pièces dans le jeu Tetris.
 * Ce hook retourne le temps de chute actuel, ainsi que des fonctions pour mettre en pause et reprendre le temps de chute.
 * @param {Object} options - Les options du jeu, contenant les statistiques du jeu.
 * @param {Object} options.gameStats - Les statistiques du jeu, comprenant le niveau actuel.
 * @returns Un tableau contenant le temps de chute, la fonction pour mettre en pause le temps de chute et la fonction pour reprendre le temps de chute.
 */
export const useDropTime = ({ gameStats }) => {
  const [dropTime, setDropTime] = useState(defaultDropTime);
  const [previousDropTime, setPreviousDropTime] = useState();

  /**
   * Fonction pour mettre en pause le temps de chute.
   * Si le temps de chute est déjà en pause, cette fonction n'a aucun effet.
   * Cette fonction est créée avec useCallback pour garantir sa stabilité entre les rendus.
   */
  const pauseDropTime = useCallback(() => {
    if (dropTime) {
      setPreviousDropTime(dropTime);
    }
    setDropTime(null);
  }, [dropTime, setPreviousDropTime]);

  /**
   * Fonction pour reprendre le temps de chute.
   * Si le temps de chute n'est pas en pause, cette fonction n'a aucun effet.
   * Cette fonction est créée avec useCallback pour garantir sa stabilité entre les rendus.
   */
  const resumeDropTime = useCallback(() => {
    if (!previousDropTime) {
      return;
    }
    setDropTime(previousDropTime);
    setPreviousDropTime(null);
  }, [previousDropTime]);

  useEffect(() => {
    const speed = speedIncrement * (gameStats.level - 1);
    const newDropTime = Math.max(defaultDropTime - speed, minimumDropTime);

    setDropTime(newDropTime);
  }, [gameStats.level, setDropTime]);

  return [dropTime, pauseDropTime, resumeDropTime];
};
