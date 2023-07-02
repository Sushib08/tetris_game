import React from "react";
import "../components/styles/GameController.css";

// Target
import { Action, actionForKey } from "../target_project/Input";

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
    console.log(`onKeyUp ${code}`);
  };

  const onKeyDown = ({ code }) => {
    console.log(`onKeyDown ${code}`);
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
