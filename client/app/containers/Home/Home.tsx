import * as React from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';

import { SidebarMenu } from '..';

import sidebarStyles from '../../components/Sidebar/sidebarStyles';

const SidebarTarget: any = styled.div`
  padding-left: ${(props: any) => props.isSidebarOpen ? sidebarStyles.mainDrawer.width : sidebarStyles.secondDrawer.width}px;
`;

class Home extends React.Component<any, any> {
  constructor(props, state) {
    super(props, state);
  }

  public render() {
    return(
      <div>
        <SidebarMenu />
        <SidebarTarget isSidebarOpen={this.props.isSidebarOpen}>
          {this.props.children}
        </SidebarTarget>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { sidebar: { sidebarToggle } } = state;
  const { open: isSidebarOpen } = sidebarToggle;

  return {
    isSidebarOpen,
  };
}

export default connect(mapStateToProps)(Home);
