/**
 * Définition des tétraminos, leurs formes et classes.
 */
const className = "tetromino";

export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    className: `${className} ${className}__i`,
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    className: `${className} ${className}__j`,
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    className: `${className} ${className}__l`,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    className: `${className} ${className}__o`,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    className: `${className} ${className}__s`,
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    className: `${className} ${className}__t`,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    className: `${className} ${className}__z`,
  },
};

/**
 * Génère un tétraminos aléatoire.
 * @returns Un objet représentant un tétraminos avec une forme et une classe associée.
 */
export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return TETROMINOES[key];
};

/**
 * Effectue une rotation du tétraminos donné dans une direction donnée.
 * @param piece - Le tétraminos à faire pivoter.
 * @param direction - La direction de rotation : 1 pour rotation horaire, -1 pour rotation antihoraire.
 * @returns Le tétraminos après rotation.
 */
export const rotate = ({ piece, direction }) => {
  // Transposer les lignes et les colonnes
  const newPiece = piece.map((_, index) =>
    piece.map((column) => column[index])
  );

  // Inverser les lignes pour obtenir une matrice pivotée
  if (direction > 0) return newPiece.map((row) => row.reverse());

  return newPiece.reverse();
};

/**
 * Transfère les cellules du tétraminos sur le plateau de jeu.
 * @param className - La classe associée au tétraminos.
 * @param isOccupied - Indique si les cellules sont occupées.
 * @param position - La position du tétraminos sur le plateau.
 * @param rows - Les lignes du plateau de jeu.
 * @param shape - La forme du tétraminos.
 * @returns Les lignes du plateau de jeu avec les cellules du tétraminos transférées.
 */
export const transferToBoard = ({
  className,
  isOccupied,
  position,
  rows,
  shape,
}) => {
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const occupied = isOccupied;
        const _y = y + position.row;
        const _x = x + position.column;
        rows[_y][_x] = { occupied, className };
      }
    });
  });

  return rows;
};
