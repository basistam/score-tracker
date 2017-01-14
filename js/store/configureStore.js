import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist-immutable';
import {AsyncStorage} from 'react-native';

export default (initialState) => {
  let store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  );

  persistStore(store, {storage: AsyncStorage});

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
