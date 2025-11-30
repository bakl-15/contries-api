import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // ❌ tu avais { thunk }
import { loadState, saveState } from './storage';
import countryReducer from '../Features/CountrySlice'; // ❌ importer le reducer

// Combine reducers si tu en as plusieurs
const rootReducer = combineReducers({
  country: countryReducer, 
});

// Charger l’état persistant
const persistedState = loadState();

export const store = configureStore({
  reducer: rootReducer, // ✅ option correcte
 // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: import.meta.env.MODE !== 'production',
  preloadedState: persistedState, // ✅ pour restaurer le state sauvegardé
});

// Sauvegarde automatique à chaque changement du store
store.subscribe(() => {
  saveState(store.getState());
});

console.log('Store initialisé avec persistance des slices:');
