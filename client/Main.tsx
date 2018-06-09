import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Link, Route, Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Store } from 'redux';

import { Home, HomeLandingPage, JiraAssignHistoryTimeline } from './app/containers';
import { default as history } from './app/modules/getHistory';
import configureStore from './app/modules/store';
import muiDefaultTheme from './app/theme/default.theme';

import routes from './app/modules/routes';

import './assets/styles/material-ui-icons.css';

declare global {
  /* tslint:disable-next-line:interface-name */
  interface Window {
    __PRELOADED_STATE__: any;
  }
}

export default class Main extends React.Component<any, any> {
  constructor(props, state) {
    super(props, state);
  }

  /**
   * If this doesn't work, it might be because you are using old version of react-router-redux
   * https://github.com/ReactTraining/react-router/issues/5428
   */
  render() {
    const store: Store<any> = configureStore(window.__PRELOADED_STATE__, history);
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider muiTheme={muiDefaultTheme}>
            <Home>
              <Router history={history}>
                {routes}
              </Router>
            </Home>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
