import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { Home } from './app/containers';
import { history, store } from './app/modules/store';
import muiDefaultTheme from './app/theme/default.theme';

import './assets/styles/material-ui-icons.css';

export default class Main extends React.Component<any, any> {
  constructor(props, state) {
    super(props, state);
  }

  /**
   * If this doesn't work, it might be because you are using old version of react-router-redux
   * https://github.com/ReactTraining/react-router/issues/5428
   */
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider muiTheme={muiDefaultTheme}>
              <Home />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
