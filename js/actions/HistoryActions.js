const PREFIX = 'HISTORY.';

export const ADD_TO_HISTORY      = PREFIX + 'ADD_TO_HISTORY';
export const REMOVE_FROM_HISTORY = PREFIX + 'REMOVE_FROM_HISTORY';

export const addToHistory = (game) => ({
  type: ADD_TO_HISTORY,
  game: game
});

export const removeFromHistory = (index) => ({
  type: REMOVE_FROM_HISTORY,
  index: index
});
