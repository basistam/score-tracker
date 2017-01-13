import {
  combineReducers
} from 'redux-immutable';
import app from './AppReducer';
import teams from './TeamsReducer';
import players from './PlayersReducer';
import game from './GameReducer';

export default combineReducers({
  app,
  teams,
  players,
  game
});
