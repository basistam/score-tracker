import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import App from '../components/App';
import * as AppActions from '../actions/AppActions';
import * as GameActions from '../actions/GameActions';

const mapStateToProps = (state) => ({
    setScore: state.get('app').get('setScore'),
    results: state.get('app').get('results'),
});

export default connect(mapStateToProps, (dispatch) => Object.assign(
  bindActionCreators(AppActions, dispatch),
  bindActionCreators(GameActions, dispatch),
))(App);
