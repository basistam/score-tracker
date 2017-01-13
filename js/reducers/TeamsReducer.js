import Immutable from 'immutable';
import * as Actions from '../actions/TeamsActions';

const initialState = Immutable.fromJS({
  home: {
    id: 'home',
    title: 'Home Team',
    name: 'Home Team',
  },
  guest: {
    id: 'guest',
    title: 'Guest Team',
    name: 'Guest Team',
  }
});

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_TEAM_NAME:
      return state.setIn([action.id, 'name'], action.homeTeamName);
    default:
      return state;
  }
}
