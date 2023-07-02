import React from "react";
import "./styles/Menu.css";

/**
 * Composant représentant le menu du jeu Tetris.
 * Ce composant affiche un bouton pour démarrer le jeu Tetris.
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onClick - La fonction de rappel à appeler lors du clic sur le bouton.
 * @returns {JSX.Element} - L'élément du menu du jeu Tetris.
 */
export const Menu = ({ onClick }) => {
  return (
    <div className="Menu">
      <button className="Button" onClick={onClick}>
        Start Tetris
      </button>
    </div>
  );
};
