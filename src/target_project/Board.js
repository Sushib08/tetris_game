import { defaultCell } from "./Cell";

/**
 * Construit un plateau de jeu avec un nombre donné de lignes et de colonnes.
 * @param rows - Le nombre de lignes du plateau.
 * @param columns - Le nombre de colonnes du plateau.
 * @returns Un objet représentant le plateau de jeu avec des lignes vides et la taille du plateau.
 */
export const buildBoard = ({ rows, columns }) => {
  // Construction des lignes du plateau avec des cellules par défaut
  const buildRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  return {
    rows: buildRows, // Les lignes du plateau
    size: { rows, columns }, // La taille du plateau
  };
};
