import * as React from 'react';

import { MemoryHistory } from 'history';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider, Store } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { matchPath, StaticRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { Home } from '../../client/app/containers';
import { routesData } from '../../client/app/modules/routes';
import { themeOptions } from '../../client/app/theme/default.theme';

export interface IMainProps {
  memoryHistory: MemoryHistory;
  rContext: any;
  request: any;
  store: Store<any>;
}

export default class Main extends React.Component<IMainProps, any> {

  constructor(props) {
    super(props);
  }

  public render() {
    const { memoryHistory, rContext, request, store } = this.props;
    const extendedTheme: __MaterialUI.Styles.MuiTheme = getMuiTheme({
      ...themeOptions,
      userAgent: request.headers['user-agent'],
    });
    return (
      <Provider store={store}>
        <ConnectedRouter history={memoryHistory}>
          <StaticRouter location={request.url} context={rContext}>
            <MuiThemeProvider muiTheme={extendedTheme}>
              <Home>
                {renderRoutes(routesData)}
              </Home>
            </MuiThemeProvider>
          </StaticRouter>
        </ConnectedRouter>
      </Provider>
    );
  }
}
