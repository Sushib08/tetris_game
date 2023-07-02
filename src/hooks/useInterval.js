import { useEffect, useRef } from "react";

/**
 * Hook personnalisé pour exécuter une fonction de rappel à intervalle régulier.
 * @param {Function} callback - La fonction de rappel à exécuter à intervalle régulier.
 * @param {number|null} delay - Le délai en millisecondes entre les exécutions de la fonction de rappel. Si la valeur est null, l'intervalle est arrêté.
 */
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  });
};
