import Immutable from 'immutable';
import * as Actions from '../actions/GameActions';
import uuid from 'uuid';

const newGame = () => Immutable.fromJS({
  id: uuid.v4(),
  startDate: new Date(),
  endDate: null,
  events: []
});

const initialState = newGame();

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.NEW_GAME:
      return newGame();
    case Actions.SET_END_DATE:
      return state.set('endDate', action.endDate);
    case Actions.ADD_EVENT:
      return state.update('events', events => events.push(action.event));
    case Actions.UNDO:
      return state.update('events', events => events.pop());
    default:
      return state;
  }
}
