import { useState } from "react";

// Target
import { buildBoard } from "../target_project/Board";

/**
 * Hook personnalisé pour gérer le plateau de jeu.
 * Ce hook initialise le plateau de jeu avec les lignes et colonnes spécifiées,
 * et retourne le plateau de jeu.
 * @param rows - Le nombre de lignes du plateau de jeu.
 * @param columns - Le nombre de colonnes du plateau de jeu.
 * @returns Un tableau contenant le plateau de jeu.
 */
export const useBoard = ({ rows, columns }) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  return [board];
};
