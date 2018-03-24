import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import getRoutes from './app/modules/routes';
import { history, store } from './app/modules/store';
import muiDefaultTheme from './app/theme/default.theme';

/**
 * https://github.com/zilverline/react-tap-event-plugin/issues/58
 * Macmee commented on Apr 6, 2017
 */
declare module 'react' {
  /* tslint:disable-next-line:interface-name */
  interface DOMAttributes<T> {
      onTouchTap?: React.EventHandler<React.TouchEvent<T>>;
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
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider muiTheme={muiDefaultTheme}>
              {getRoutes(history)}
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
