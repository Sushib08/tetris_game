import { defaultCell } from "./Cell";
import { movePlayer } from "./PlayerController";
import { transferToBoard } from "./Tetrominoes";

/**
 * Construit un nouveau plateau de jeu vide avec les dimensions spécifiées.
 *
 * @param {Object} params - Les paramètres de construction du plateau.
 * @param {number} params.rows - Le nombre de lignes du plateau.
 * @param {number} params.columns - Le nombre de colonnes du plateau.
 * @returns {Object} Le plateau de jeu construit.
 */
export const buildBoard = ({ rows, columns }) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  return {
    rows: builtRows,
    size: { rows, columns },
  };
};

/**
 * Trouve la position de chute pour une pièce donnée sur le plateau.
 *
 * @param {Object} params - Les paramètres de recherche de position de chute.
 * @param {Object} params.board - Le plateau de jeu.
 * @param {Object} params.position - La position initiale de la pièce.
 * @param {number[][]} params.shape - La forme de la pièce.
 * @returns {Object} La position de chute calculée.
 */
const findDropPosition = ({ board, position, shape }) => {
  let max = board.size.rows - position.row + 1;
  let row = 0;

  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }

    row = position.row + i;
  }

  return { ...position, row };
};

/**
 * Calcule le prochain état du plateau de jeu après le déplacement du joueur.
 *
 * @param {Object} params - Les paramètres du calcul de l'état du plateau.
 * @param {Object} params.board - Le plateau de jeu actuel.
 * @param {Object} params.player - Le joueur actuel.
 * @param {Function} params.resetPlayer - La fonction de réinitialisation du joueur.
 * @param {Function} params.addLinesCleared - La fonction d'ajout de lignes effacées.
 * @returns {Object} Le prochain état du plateau de jeu.
 */
export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;

  // Copier et effacer les espaces utilisés par les pièces qui n'ont pas
  // encore collisionné et les espaces occupés de manière permanente
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  // Position de chute
  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape,
  });

  // Placer le fantôme
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "ghost"
  }`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: tetromino.shape,
  });

  // Placer la pièce.
  // Si elle entre en collision, marquer les cellules du plateau comme collisionnées
  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: tetromino.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: tetromino.shape,
    });
  }

  // Vérifier les lignes effacées
  const blankRow = rows[0].map((_) => ({ ...defaultCell }));
  let linesCleared = 0;
  rows = rows.reduce((acc, row) => {
    if (row.every((column) => column.occupied)) {
      linesCleared++;
      acc.unshift([...blankRow]);
    } else {
      acc.push(row);
    }

    return acc;
  }, []);

  if (linesCleared > 0) {
    addLinesCleared(linesCleared);
  }

  // Si nous avons collisionné, réinitialiser le joueur !
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }

  // Retourner le prochain plateau de jeu
  return {
    rows,
    size: { ...board.size },
  };
};

/**
 * Vérifie s'il y a une collision entre une pièce et le plateau de jeu.
 *
 * @param {Object} params - Les paramètres de détection de collision.
 * @param {Object} params.board - Le plateau de jeu.
 * @param {Object} params.position - La position de la pièce.
 * @param {number[][]} params.shape - La forme de la pièce.
 * @returns {boolean} True s'il y a une collision, sinon False.
 */
export const hasCollision = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;

        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

/**
 * Vérifie si une position donnée est valide à l'intérieur du plateau de jeu.
 *
 * @param {Object} params - Les paramètres de vérification de la position.
 * @param {Object} params.board - Le plateau de jeu.
 * @param {Object} params.position - La position à vérifier.
 * @param {number[][]} params.shape - La forme de la pièce.
 * @returns {boolean} True si la position est valide, sinon False.
 */
export const isWithinBoard = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) return false;
      }
    }
  }

  return true;
};
