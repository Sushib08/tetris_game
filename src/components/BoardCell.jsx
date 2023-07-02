import React from "react";
import "./styles/BoardCell.css";

/**
 * Composant représentant une cellule du tableau de jeu.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.cell - La cellule du tableau.
 * @param {string} props.cell.className - La classe de la cellule.
 * @returns {JSX.Element} - L'élément de la cellule du tableau de jeu.
 */
export const BoardCell = ({ cell }) => {
  return (
    <div className={`BoardCell ${cell.className}`}>
      <div className="Sparkle"></div>
    </div>
  );
};
