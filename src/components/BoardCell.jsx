import React from "react";
import "./styles/BoardCell.css";

export const BoardCell = ({ cell }) => {
  return (
    <div className={`BoardCell ${cell.className}`}>
      <div className="Sparkle"></div>
    </div>
  );
};
