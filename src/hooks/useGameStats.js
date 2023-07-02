import { useState, useCallback } from "react";

/**
 * Fonction pour construire les statistiques de jeu initiales.
 * @returns {Object} Les statistiques de jeu initialisées.
 * @property {number} level - Le niveau initial du jeu.
 * @property {number} linesCompleted - Le nombre de lignes complétées.
 * @property {number} linesPerLevel - Le nombre de lignes requis pour passer au niveau suivant.
 * @property {number} points - Le nombre de points.
 */
const buildGameStats = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 10,
  points: 0,
});

/**
 * Hook personnalisé pour gérer les statistiques de jeu dans le jeu Tetris.
 * Ce hook initialise les statistiques de jeu et fournit une fonction pour ajouter le nombre de lignes complétées.
 * @returns Un tableau contenant les statistiques de jeu et la fonction pour ajouter les lignes complétées.
 */
export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGameStats());

  /**
   * Fonction pour ajouter le nombre de lignes complétées aux statistiques de jeu.
   * Cette fonction est créée avec useCallback pour garantir sa stabilité entre les rendus.
   * @param {number} lines - Le nombre de lignes complétées.
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
