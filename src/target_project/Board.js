import React from "react";
import { defaultCell } from "./Cell";

export const buildBoard = ({ rows, columns }) => {
  const buildRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );
  return {
    rows: buildRows,
    size: { rows, columns },
  };
};

/* 
Nous voulons créer un tableau pour les ligne et pour chaque
ligne nous allons créer un tableau pour les colonnes
puis dans chaque colonne du tableau nous allons configurer 
une cellule par défaut
*/
