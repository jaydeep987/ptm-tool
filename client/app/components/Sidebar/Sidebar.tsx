import * as React from 'react';

import { Divider, Drawer, IconButton } from 'material-ui';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router';

import { FullBleedDivider } from '..';
import { toggleSidebar } from '../../actions/Sidebar';
import AlternativeDrawer from './AlternativeDrawer';
import SidebarHeader from './SidebarHeader';
import SidebarItems from './SidebarItems';
import sidebarStyles from './sidebarStyles';

export interface ISidebarProps {
  open?: boolean;
  dispatch?: Dispatch<any>;
  menus: any[];
  redirectToDefaultRoute?: boolean;
}

class Sidebar extends React.Component<ISidebarProps, any> {

  private defaultTargetRoute: string;
  private isRedirect: boolean;

  constructor(props, state) {
    super(props, state);

    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
    this.isRedirect = this.props.redirectToDefaultRoute;
  }

  componentWillMount() {
    const menus: any[] = this.props.menus || [];
    const foundMenu: any = menus.find((menu) => menu.default) || {}; // find default route and redirect
    this.defaultTargetRoute = foundMenu.targetRoute || '';
    this.isRedirect = this.isRedirect && this.defaultTargetRoute && true;
  }

  render() {
    return (
      <div>
        <Drawer width={sidebarStyles.mainDrawer.width} containerStyle={sidebarStyles.mainDrawer} open={this.props.open}>
          <SidebarHeader handleSidebarToggle={this.handleSidebarToggle} />
          <FullBleedDivider/>
          <SidebarItems menus={this.props.menus} />
          {this.isRedirect && !(this.isRedirect = false) && <Redirect from="/" to={this.defaultTargetRoute} />}
        </Drawer>
        <AlternativeDrawer open={!this.props.open} handleSidebarToggle={this.handleSidebarToggle} />
      </div>
    );
  }

  private handleSidebarToggle() {
    const { dispatch } = this.props;
    dispatch(toggleSidebar(!this.props.open));
  }
}

function mapStateToProps(state, ownProps) {
  const { sidebar: { sidebarToggle } } = state;
  const { open } = sidebarToggle || { open: true };

  return { open };
}

export default connect(mapStateToProps)(Sidebar);
