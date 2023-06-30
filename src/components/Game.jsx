import React from "react";
import { Menu } from "../components/Menu";

export const Game = ({ rows, columns }) => {
  const start = () => {
    console.log("start");
  };
  return (
    <div className="Game">
      <Menu onClick={start} />
    </div>
  );
};
