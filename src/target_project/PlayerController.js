import { Action } from "./Input";
import { rotate } from "./Tetrominoes";
import { hasCollision, isWithinBoard } from "./Board";

/**
 * Tente de faire pivoter le tétraminos du joueur dans le sens horaire.
 *
 * @param {Object} params - Les paramètres de la tentative de rotation.
 * @param {number[][]} params.board - Le plateau de jeu.
 * @param {Object} params.player - Le joueur actuel.
 * @param {Function} params.setPlayer - La fonction de mise à jour du joueur.
 */
const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape,
      },
    });
  } else {
    return false;
  }
};

/**
 * Déplace le joueur en fonction de l'action spécifiée.
 *
 * @param {Object} params - Les paramètres du déplacement du joueur.
 * @param {Object} params.delta - Les changements de position (décalage).
 * @param {Object} params.position - La position actuelle du joueur.
 * @param {number[][]} params.shape - La forme du tétraminos du joueur.
 * @param {number[][]} params.board - Le plateau de jeu.
 * @returns {Object} Les informations sur le déplacement du joueur.
 * @property {boolean} collided - Indique si le joueur a rencontré une collision.
 * @property {Object} nextPosition - La prochaine position du joueur après le déplacement.
 */
export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column,
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape,
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape,
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};

/**
 * Tente de déplacer le joueur en fonction de l'action spécifiée.
 *
 * @param {Object} params - Les paramètres de la tentative de déplacement.
 * @param {number[][]} params.board - Le plateau de jeu.
 * @param {Action} params.action - L'action effectuée par le joueur.
 * @param {Object} params.player - Le joueur actuel.
 * @param {Function} params.setPlayer - La fonction de mise à jour du joueur.
 * @param {Function} params.setGameOver - La fonction de mise à jour du statut de fin de jeu.
 */
const attemptMovement = ({ board, action, player, setPlayer, setGameOver }) => {
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  if (action === Action.FastDrop) {
    isFastDropping = true;
  } else if (action === Action.SlowDrop) {
    delta.row += 1;
  } else if (action === Action.Left) {
    delta.column -= 1;
  } else if (action === Action.Right) {
    delta.column += 1;
  }

  const { collided, nextPosition } = movePlayer({
    delta,
    position: player.position,
    shape: player.tetromino.shape,
    board,
  });

  // Did we collide immediately? If so, game over, man!
  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setGameOver(isGameOver);
  }

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
  });
};

/**
 * Contrôleur du joueur.
 *
 * @param {Object} params - Les paramètres du contrôleur du joueur.
 * @param {Action} params.action - L'action effectuée par le joueur.
 * @param {number[][]} params.board - Le plateau de jeu.
 * @param {Object} params.player - Le joueur actuel.
 * @param {Function} params.setPlayer - La fonction de mise à jour du joueur.
 * @param {Function} params.setGameOver - La fonction de mise à jour du statut de fin de jeu.
 */
export const PlayerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setPlayer, action, setGameOver });
  }
};
