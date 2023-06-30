import React, { useState } from "react";

// Target
import { buildBoard } from "../target_project/Board";

export const useBoard = ({ rows, columns }) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));
  return [board];
};
