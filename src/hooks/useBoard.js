import { useEffect, useState } from "react";

// Target
import { buildBoard, nextBoard } from "../target_project/Board";

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared,
      })
    );
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};
