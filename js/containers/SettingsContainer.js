import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Settings from '../components/Settings';
import * as TeamsActions from '../actions/TeamsActions';
import * as PlayersActions from '../actions/PlayersActions';

const mapStateToProps = (state) => ({
    setScore: state.get('app').get('setScore'),
    teams: state.get('teams'),
    players: state.get('players'),
});

export default connect(mapStateToProps, (dispatch) => Object.assign(
  bindActionCreators(TeamsActions, dispatch),
  bindActionCreators(PlayersActions, dispatch),
))(Settings);
