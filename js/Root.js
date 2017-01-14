import React from 'react';
import AppContainer from './containers/AppContainer';
import {
  Provider
} from 'react-redux';
import configureStore from './store/configureStore';
import Immutable from 'immutable';

const initialState = Immutable.Map();

const store = configureStore(initialState);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

Root.propTypes = {};
Root.defaultProps = {};

export default Root;
