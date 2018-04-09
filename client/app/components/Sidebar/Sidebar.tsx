import * as React from 'react';

import { Divider, Drawer, IconButton } from 'material-ui';
import { connect, Dispatch } from 'react-redux';

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
}

class Sidebar extends React.Component<ISidebarProps, any> {

  constructor(props, state) {
    super(props, state);

    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
  }

  public render() {
    return (
      <div>
        <Drawer width={sidebarStyles.mainDrawer.width} containerStyle={sidebarStyles.mainDrawer} open={this.props.open}>
          <SidebarHeader handleSidebarToggle={this.handleSidebarToggle} />
          <FullBleedDivider/>
          <SidebarItems menus={this.props.menus} />
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
