/**
 * Classe représentant les différentes formes de tétraminos.
 *
 * @typedef {Object} Tetromino
 * @property {number[][]} shape - La forme du tétraminos représentée par une matrice de nombres.
 * @property {string} className - La classe CSS correspondante pour le tétraminos.
 */

/**
 * Classe représentant les différentes formes de tétraminos.
 *
 * @type {Object<string, Tetromino>}
 */
export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    className: "tetromino tetromino__i",
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    className: "tetromino tetromino__j",
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    className: "tetromino tetromino__l",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    className: "tetromino tetromino__o",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    className: "tetromino tetromino__s",
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    className: "tetromino tetromino__t",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    className: "tetromino tetromino__z",
  },
};

/**
 * Génère un tétraminos aléatoire.
 *
 * @returns {Tetromino} Un tétraminos aléatoire.
 */
export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return TETROMINOES[key];
};

/**
 * Effectue une rotation sur le tétraminos donné.
 *
 * @param {Object} params - Les paramètres de rotation.
 * @param {Tetromino} params.piece - Le tétraminos à pivoter.
 * @param {number} params.direction - La direction de rotation (-1 pour sens horaire, 1 pour sens anti-horaire).
 * @returns {number[][]} La nouvelle forme du tétraminos après la rotation.
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
 * Transfère le tétraminos sur le plateau de jeu.
 *
 * @param {Object} params - Les paramètres de transfert.
 * @param {string} params.className - La classe CSS correspondante pour le tétraminos.
 * @param {boolean} params.isOccupied - Indique si la case est occupée ou non.
 * @param {Object} params.position - La position du tétraminos sur le plateau.
 * @param {number[][]} params.rows - Les lignes du plateau de jeu.
 * @param {number[][]} params.shape - La forme du tétraminos représentée par une matrice de nombres.
 * @returns {number[][]} Les nouvelles lignes du plateau de jeu après le transfert du tétraminos.
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
