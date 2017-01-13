import {connect} from 'react-redux';
import Results from '../components/Results';
import * as HistoryActions from '../actions/HistoryActions';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => ({
  data: state.get('history')
});

export default connect(mapStateToProps, (dispatch) => Object.assign(
  bindActionCreators(HistoryActions, dispatch)
))(Results);
