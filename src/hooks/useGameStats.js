import { useState, useCallback } from "react";

/**
 * Fonction utilitaire pour construire les statistiques de jeu par défaut.
 * Les statistiques de jeu par défaut comprennent le niveau initial, le nombre de lignes complétées,
 * le nombre de lignes requis pour passer au niveau suivant et le nombre de points.
 * @returns Les statistiques de jeu par défaut.
 */
const buildGameStats = () => ({
  level: 1, // Le niveau initial du jeu
  linesCompleted: 0, // Le nombre de lignes complétées
  linesPerLevel: 10, // Le nombre de lignes requis pour passer au niveau suivant
  points: 0, // Le nombre de points
});

/**
 * Hook personnalisé pour gérer les statistiques de jeu.
 * Ce hook retourne les statistiques de jeu actuelles ainsi qu'une fonction pour ajouter des lignes effacées.
 * @returns Un tableau contenant les statistiques de jeu et la fonction pour ajouter des lignes effacées.
 */
export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGameStats());

  /**
   * Fonction pour ajouter des lignes effacées aux statistiques de jeu.
   * Cette fonction est créée avec useCallback pour garantir sa stabilité entre les rendus.
   * @param lines - Le nombre de lignes effacées à ajouter.
   */
  const addLinesCleared = useCallback((lines) => {
    setGameStats((previous) => {
      const points = previous.points + lines * 100;
      const { linesPerLevel } = previous;
      const newLinesCompleted = previous.linesCompleted + lines;
      const level =
        newLinesCompleted >= linesPerLevel
          ? previous.level + 1
          : previous.level;
      const linesCompleted = newLinesCompleted % linesPerLevel;

      return {
        level,
        linesCompleted,
        linesPerLevel,
        points,
      };
    });
  }, []);

  return [gameStats, addLinesCleared];
};
