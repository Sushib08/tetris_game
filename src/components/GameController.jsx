import React from "react";
import "../components/styles/GameController.css";

// Target
import { Action, actionForKey } from "../target_project/Input";
import { PlayerController } from "../target_project/PlayerController";

export const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);

    if (action === Action.Quit) {
      setGameOver(true);
    }
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);
    handleInput({ action });
  };

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
