import React from "react";
import "./styles/GameStats.css";

/**
 * Composant représentant les statistiques de jeu du Tetris.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.gameStats - Les statistiques de jeu.
 * @param {number} props.gameStats.level - Le niveau actuel du jeu.
 * @param {number} props.gameStats.points - Le nombre de points.
 * @param {number} props.gameStats.linesCompleted - Le nombre de lignes complétées.
 * @param {number} props.gameStats.linesPerLevel - Le nombre de lignes requis pour passer au niveau suivant.
 * @returns {JSX.Element} - L'élément des statistiques de jeu du Tetris.
 */
const GameStats = ({ gameStats }) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <ul className="GameStats GameStats_right">
      <li>Niveau</li>
      <li className="value">{level}</li>
      <li>Lignes avant le prochain niveau</li>
      <li className="value">{linesPerLevel}</li>
      <li>Points</li>
      <li className="value">{points}</li>
    </ul>
  );
};

export default React.memo(GameStats);
