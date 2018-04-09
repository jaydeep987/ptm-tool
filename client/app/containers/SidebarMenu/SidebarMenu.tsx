import * as React from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import { connect, Dispatch } from 'react-redux';

import { fetchSidebarMenus } from '../../actions/Sidebar';
import { Sidebar } from '../../components';

export interface ISidebarMenu {
  dispatch?: Dispatch<any>;
  isRequesting?: boolean;
  menus: any;
}

class SidebarMenu extends React.Component <ISidebarMenu, any> {
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSidebarMenus());
  }

  public render() {
    return(
      <div>
        {this.props.isRequesting && <RefreshIndicator size={40} left={150} top={150} status="loading" />}
        {this.props.isRequesting === false && <Sidebar menus={this.props.menus} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.sidebar.sidebarAllMenus,
  };
};

export default connect(mapStateToProps)(SidebarMenu);
