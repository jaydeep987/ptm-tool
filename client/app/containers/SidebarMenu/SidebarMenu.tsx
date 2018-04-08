import * as React from 'react';
import { Sidebar } from '../../components';

export default class SidebarMenu extends React.Component <any, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  public render() {
    return(
      <div>
        <Sidebar />
      </div>
    );
  }
}
