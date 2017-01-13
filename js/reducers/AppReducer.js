import Immutable from 'immutable';
import * as Actions from '../actions/AppActions';

const initialState = Immutable.fromJS({
  setScore: 10
});

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_SET_SCORE:
      return state.set('setScore', action.setScore);
    default:
      return state;
  }
}
