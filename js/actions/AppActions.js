const PREFIX = 'APP.';

export const SET_SET_SCORE = PREFIX + 'SET_SET_SCORE';
export const ADD_RESULT    = PREFIX + 'ADD_RESULT';
export const REMOVE_RESULT = PREFIX + 'REMOVE_RESULT';

export const addResult = (result) => ({
  type: ADD_RESULT,
  result: result
});

export const removeResult = (index) => ({
  type: REMOVE_RESULT,
  index: index
});

export const setSetScore = (value) => ({
  type: SET_SET_SCORE,
  setScore: value
});
