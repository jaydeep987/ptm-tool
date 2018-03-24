import createHistory from 'history/createBrowserHistory';

import { History } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

declare global {
  /* tslint:disable-next-line:interface-name */
  interface Window { devToolsExtension: any; }
}

/* https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but */
const history: History = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store: Store<any> = createStore(
  routerReducer,
  initialState,
  composedEnhancers,
);

export { history, store };
