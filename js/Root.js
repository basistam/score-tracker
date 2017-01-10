import React from 'react';
import App from './containers/App';
import {
  Provider
} from 'react-redux';
import configureStore from './store/configureStore';

const initialState = {};

class Root extends React.Component {
  render() {
    return (
      <Provider store={configureStore(initialState)}>
        <App />
      </Provider>
    );
  }
}

Root.propTypes = {};
Root.defaultProps = {};

export default Root;
