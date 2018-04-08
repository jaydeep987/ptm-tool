import * as React from 'react';

import { IconButton } from 'material-ui';
import ClearFix from 'material-ui/internal/ClearFix';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import styled from 'styled-components';

import sidebarStyles from './sidebarStyles';

const HeaderTitle = styled.h3`
  margin: 15px;
  float: left;
  font-family: monospace, cursive;
  font-size: 20pt;
  color: #163760;
`;

export interface ISidebarHeaderProps {
  handleSidebarToggle: () => void;
}

export default class SidebarHeader extends React.Component<ISidebarHeaderProps, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    return(
      <div>
        <header>
            <HeaderTitle>
              Menu
            </HeaderTitle>
            <IconButton
              iconStyle={{...sidebarStyles.smallIcon, ...sidebarStyles.smallIconBorder}}
              style={sidebarStyles.showHideIcon}
              onClick={this.props.handleSidebarToggle}
            >
              <ChevronLeft />
            </IconButton>
            <ClearFix />
          </header>
      </div>
    );
  }
}
