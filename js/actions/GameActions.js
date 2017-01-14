import * as GameUtils from '../utils/GameUtils';
import * as HistoryActions from './HistoryActions';

const PREFIX = 'GAME.';

export const NEW_GAME     = PREFIX + 'NEW_GAME';
export const SET_END_DATE = PREFIX + 'SET_END_DATE';
export const ADD_EVENT    = PREFIX + 'ADD_EVENT';
export const UNDO         = PREFIX + 'UNDO';

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

export const playerScores = (event) => (dispatch, getState) => {
  const state = getState();

  const score = GameUtils.getScore(state.get('game')).get('teams');
  const setScore = state.get('app').get('setScore');
  if (score.get('home') < setScore && score.get('guest') < setScore) {
    dispatch(addEvent(event));
  }
};

/**
 * Removes latest event from eventList
 */
export const undo = () => ({
  type: UNDO
});

export const saveResult = () => (dispatch, getState) => {
  const state = getState();
  const game = state.get('game').set('home', state.getIn(['teams', 'home'])).set('guest', state.getIn(['teams', 'guest'])).set('players', state.get('players'));
  dispatch(HistoryActions.addToHistory(game));
  dispatch(newGame());
};
