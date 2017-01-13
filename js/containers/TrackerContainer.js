import {connect} from 'react-redux';
import Tracker from '../components/Tracker';
import {bindActionCreators} from 'redux';
import * as GameActions from '../actions/GameActions';
import * as PlayersActions from '../actions/PlayersActions';
import * as GameUtils from '../utils/GameUtils';

const getPlayer = (state, team, position) => {
  return state.get('players').find(player => player.get('team') === team && player.get('position') === position);
}

const mapStateToProps = (state) => ({
    setScore: state.get('app').get('setScore'),
    homeTeam: state.get('teams').get('home'),
    guestTeam: state.get('teams').get('guest'),
    guestDefensePlayer: getPlayer(state, 'guest', 'defense'),
    guestOffensePlayer: getPlayer(state, 'guest', 'offense'),
    homeDefensePlayer: getPlayer(state, 'home', 'defense'),
    homeOffensePlayer: getPlayer(state, 'home', 'offense'),
    score: GameUtils.getScore(state.get('game')),
});

export default connect(mapStateToProps, (dispatch) => Object.assign(
  bindActionCreators(GameActions, dispatch),
  bindActionCreators(PlayersActions, dispatch)
))(Tracker);
