import Immutable from 'immutable';
import * as Actions from '../actions/AppActions';

const initialState = Immutable.fromJS({
  setScore: 10,
  results: []
});

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_SET_SCORE:
      return state.set('setScore', action.setScore);
    case Actions.ADD_RESULT:
      return state.update('results', (results) => results.push(Immutable.fromJS(action.result)));
    case Actions.REMOVE_RESULT:
      return state.deleteIn(['results', action.index]);
    default:
      return state;
  }
}
