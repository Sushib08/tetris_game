import React from "react";
import { BoardCell } from "./BoardCell";
import "./styles/Board.css";

/**
 * Composant représentant le tableau de jeu.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.board - Le tableau de jeu.
 * @param {Object[]} props.board.rows - Les lignes du tableau de jeu.
 * @param {number} props.board.size.rows - Le nombre de lignes du tableau.
 * @param {number} props.board.size.columns - Le nombre de colonnes du tableau.
 * @returns {JSX.Element} - L'élément du tableau de jeu.
 */
export const Board = ({ board }) => {
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
  };

  return (
    <div className="Board" style={boardStyles}>
      {board.rows.map((row, y) =>
        row.map((cell, x) => (
          <BoardCell key={x * board.size.columns + x} cell={cell} />
        ))
      )}
    </div>
  );
};
