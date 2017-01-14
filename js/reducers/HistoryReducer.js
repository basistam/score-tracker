import Immutable from 'immutable';
import * as Actions from '../actions/HistoryActions';

const initialState = new Immutable.List();

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_TO_HISTORY:
      return state.push(action.game);
    case Actions.REMOVE_FROM_HISTORY:
      return state.delete(state.findIndex((history) => history.get('id') === action.id));
    default:
      return state;
  }
}
