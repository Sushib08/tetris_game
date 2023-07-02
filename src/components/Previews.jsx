import React from "react";
import Preview from "../components/Preview";

const Previews = ({ tetrominoes }) => {
  // On veut tout sauf le dernier
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();
  return (
    <div>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </div>
  );
};

export default React.memo(Previews);
