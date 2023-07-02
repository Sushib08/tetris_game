import React from "react";
import Preview from "../components/Preview";

/**
 * Composant représentant les prévisualisations des tétris.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.tetrominoes - Les tétris à prévisualiser.
 * @returns {JSX.Element} - L'élément contenant les prévisualisations des tétris.
 */
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
