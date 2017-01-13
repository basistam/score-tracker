import {
  combineReducers
} from 'redux-immutable';
import app from './AppReducer';
import teams from './TeamsReducer';
import players from './PlayersReducer';
import game from './GameReducer';
import history from './HistoryReducer';

export default combineReducers({
  app,
  teams,
  players,
  game,
  history
});
