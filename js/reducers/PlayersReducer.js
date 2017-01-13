import Immutable from 'immutable';
import * as Actions from '../actions/PlayersActions';

const initialState = Immutable.fromJS([
  {
    id: 0,
    name: 'Player 1',
    position: 'defense',
    team: 'home'
  },
  {
    id: 1,
    name: 'Player 2',
    position: 'offense',
    team: 'home'
  },
  {
    id: 2,
    name: 'Player 3',
    position: 'defense',
    team: 'guest'
  },
  {
    id: 3,
    name: 'Player 4',
    position: 'offense',
    team: 'guest'
  }
]);

const setInPlayerId = (state, field, id, value) => {
  return state.setIn(
    [
      state.findIndex((player) => player.get('id') === id),
      field
    ],
    value
  );
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_NAME:
      return setInPlayerId(state, 'name', action.id, action.name);
    case Actions.SET_TEAM:
      return setInPlayerId(state, 'team', action.id, action.team);
    case Actions.SET_POSITION:
      return setInPlayerId(state, 'position', action.id, action.position);
    default:
      return state;
  }
}
