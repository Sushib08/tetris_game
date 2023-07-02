/**
 * Actions disponibles pour le contrôleur du joueur.
 * @enum {string}
 */
export const Action = {
  Left: "Left",
  Right: "Right",
  FastDrop: "FastDrop",
  SlowDrop: "SlowDrop",
  Pause: "Pause",
  Quit: "Quit",
  Rotate: "Rotate",
};

/**
 * Mappage des touches clavier aux actions du joueur.
 * @enum {Action}
 */
export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyA: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.FastDrop,
};

/**
 * Vérifie si une action est une action de descente (drop).
 *
 * @param {Action} action - L'action à vérifier.
 * @returns {boolean} True si l'action est une action de descente, sinon False.
 */
export const actionIsDrop = (action) =>
  [Action.SlowDrop, Action.FastDrop].includes(action);

/**
 * Récupère l'action correspondant à un code de touche.
 *
 * @param {string} keyCode - Le code de la touche.
 * @returns {Action} L'action correspondante au code de la touche.
 */
export const actionForKey = (keyCode) => Key[keyCode];
