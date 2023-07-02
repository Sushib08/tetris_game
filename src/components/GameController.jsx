import React from "react";
import "../components/styles/GameController.css";

// Target
import { Action, actionForKey, actionIsDrop } from "../target_project/Input";
import { PlayerController } from "../target_project/PlayerController";

// hook
import { useInterval } from "../hooks/useInterval";
import { useDropTime } from "../hooks/useDropTime";

/**
 * Composant représentant le contrôleur de jeu du Tetris.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.board - Le tableau de jeu du Tetris.
 * @param {Object} props.gameStats - Les statistiques de jeu du Tetris.
 * @param {Object} props.player - Le joueur actuel du Tetris.
 * @param {function} props.setGameOver - La fonction pour définir l'état de fin de jeu.
 * @param {function} props.setPlayer - La fonction pour mettre à jour le joueur actuel.
 * @returns {JSX.Element} - L'élément du contrôleur de jeu du Tetris.
 */
const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats,
  });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  /**
   * Gestionnaire de l'événement "onKeyUp".
   * Cette fonction est appelée lorsqu'une touche est relâchée.
   *
   * @param {Object} event - L'événement de touche relâchée.
   */
  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  };

  /**
   * Gestionnaire de l'événement "onKeyDown".
   * Cette fonction est appelée lorsqu'une touche est enfoncée.
   *
   * @param {Object} event - L'événement de touche enfoncée.
   */
  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
    } else if (action === Action.Quit) {
      setGameOver(true);
    } else {
      if (actionIsDrop(action)) pauseDropTime();
      if (!dropTime) {
        return;
      }
      handleInput({ action });
    }
  };

  /**
   * Gestion de l'entrée de l'utilisateur.
   *
   * @param {Object} param - Les paramètres de l'entrée utilisateur.
   * @param {string} param.action - L'action de l'entrée utilisateur.
   */
  const handleInput = ({ action }) => {
    PlayerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };

  return (
    <input
      className="GameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
};

export default GameController;
