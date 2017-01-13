import {
  createStore,
  applyMiddleware
} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';


export default (initialState) => {
  let store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
