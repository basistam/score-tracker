const PREFIX = 'GAME.';

export const NEW_GAME     = PREFIX + 'NEW_GAME';
export const SET_END_DATE = PREFIX + 'SET_END_DATE';
export const ADD_EVENT    = PREFIX + 'ADD_EVENT';

export const newGame = (startDate = new Date()) => ({
  type: NEW_GAME,
  startDate: startDate
});

export const setEndDate = (endDate = new Date()) => ({
  type: SET_END_DATE,
  endDate: endDate
});

export const addEvent = (event) => ({
  type: ADD_EVENT,
  event: event
});
