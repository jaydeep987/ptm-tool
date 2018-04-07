import * as React from 'react';

import { Sidebar } from '..';
import getRoutes from '../../modules/routes';
import { history } from '../../modules/store';

export default class Home extends React.Component<any, any> {
  constructor(props, state) {
    super(props, state);
  }

  public render() {
    return(
      <div>
        <Sidebar/>
        {getRoutes(history)}
      </div>
    );
  }
}
