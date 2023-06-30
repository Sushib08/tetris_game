import React from "react";
import "./styles/Menu.css";

export const Menu = ({ onClick }) => {
  return (
    <div className="Menu">
      <button className="Button" onClick={onClick}>
        Start Tetris
      </button>
    </div>
  );
};
