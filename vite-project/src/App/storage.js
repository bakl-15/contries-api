// src/App/storage.js

// Charge l'état sauvegardé depuis localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("security-scanner-state");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Erreur lors du chargement de l'état:", err);
    return undefined;
  }
};

// Sauvegarde uniquement les slices spécifiées
export const saveState = (state, persistData = ['results']) => {
  try {
    let stateToPersist = {};

    if (persistData.length === 0) {
      // Si aucun slice précisé, on sauvegarde tout l'état
      stateToPersist = state;
    } else {
      // Sinon, on ne sauvegarde que les slices demandées
      persistData.forEach((slice) => {
        if (state[slice] !== undefined) {
          stateToPersist[slice] = state[slice];
        }
      });
    }

    localStorage.setItem("security-scanner-state", JSON.stringify(stateToPersist));
  } catch (err) {
    console.error("Erreur lors de la sauvegarde de l'état:", err);
  }
};