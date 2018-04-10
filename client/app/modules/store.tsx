
import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

declare global {
  /* tslint:disable-next-line:interface-name */
  interface Window { devToolsExtension: any; }

  /* tslint:disable-next-line:interface-name */
  interface NodeModule { hot: any; }
}

export default function configureStore(initialState?: any, history?: History) {
  const enhancers: any = [];
  const middleware: Middleware[] = [
    thunk,
  ];

  if (history) {
    middleware.push(routerMiddleware(history));
  }

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension: any = typeof window !== 'undefined' && window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
  );

  const store: Store<any> = createStore(
    reducers,
    initialState,
    composedEnhancers,
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
