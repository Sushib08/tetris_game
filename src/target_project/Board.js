import { defaultCell } from "./Cell";
import { transferToBoard } from "./Tetrominoes";

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

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;

  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  rows = transferToBoard({
    className: tetromino.className,
    isOccupied: player.collided,
    position,
    rows,
    shape: tetromino.shape,
  });

  return {
    rows,
    size: { ...board.size },
  };
};
