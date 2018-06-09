import * as React from 'react';

import { Drawer, IconButton } from 'material-ui';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import sidebarStyles from './sidebarStyles';

export interface IAlternativeDrawerProps {
  open: boolean;
  handleSidebarToggle: () => void;
}

export default class AlternativeDrawer extends React.Component<IAlternativeDrawerProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Drawer containerStyle={sidebarStyles.secondDrawer} open={this.props.open}>
          <IconButton iconStyle={sidebarStyles.smallIcon} style={sidebarStyles.showHideIcon} onClick={this.props.handleSidebarToggle}>
            <ChevronRight />
          </IconButton>
        </Drawer>
      </div>
    );
  }
}
