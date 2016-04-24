import { createStore, applyMiddleware, compose }  from 'redux';
import thunkMiddleware                            from 'redux-thunk';
import Immutable                                  from 'immutable';
import installDevTools                            from 'immutable-devtools';

import rootReducer                    from '../reducers';
import DevTools                       from '../components/DevTools';

import Perf from 'react-addons-perf';
window.Perf = Perf;

// Make our store print nicely in the console
installDevTools(Immutable);

export default function configureStore() {
  const middlewares = [
    thunkMiddleware
  ];

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware.apply(this, middlewares),
      DevTools.instrument()

    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  // Allow direct access to the store, for debugging/testing
  window.__store = store;

  return store
}
