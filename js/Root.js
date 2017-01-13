import React from 'react';
import AppContainer from './containers/AppContainer';
import {
  Provider
} from 'react-redux';
import configureStore from './store/configureStore';
import Immutable from 'immutable';

const initialState = Immutable.Map();

class Root extends React.Component {
  render() {
    return (
      <Provider store={configureStore(initialState)}>
        <AppContainer />
      </Provider>
    );
  }
}

Root.propTypes = {};
Root.defaultProps = {};

export default Root;
