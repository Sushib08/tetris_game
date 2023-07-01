import React from "react";
import "./styles/GameStats.css";

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
