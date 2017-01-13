const PREFIX = 'APP.';

export const SET_SET_SCORE = PREFIX + 'SET_SET_SCORE';

export const setSetScore = (value) => ({
  type: SET_SET_SCORE,
  setScore: value
});
