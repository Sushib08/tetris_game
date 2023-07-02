import React from "react";
import { BoardCell } from "../components/BoardCell";
import "./styles/Preview.css";

// Target
import { buildBoard } from "../target_project/Board";
import { transferToBoard } from "../target_project/Tetrominoes";

/**
 * Composant représentant la prévisualisation d'un tétris.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.tetromino - Le tétris à prévisualiser.
 * @param {string} props.tetromino.shape - La forme du tétris.
 * @param {string} props.tetromino.className - La classe du tétris.
 * @param {number} props.index - L'index de la prévisualisation.
 * @returns {JSX.Element} - L'élément de prévisualisation du tétris.
 */
const Preview = ({ tetromino, index }) => {
  const { shape, className } = tetromino;
  // Création du tableau de jeu
  const board = buildBoard({ rows: 4, columns: 4 });

  const style = { top: `${index * 15}vw` }; // Style pour définir la position verticale

  // Transfert du tétris vers le tableau de jeu
  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape,
  });

  return (
    <div className="Preview" style={style}>
      <div className="Preview-board">
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Preview);
