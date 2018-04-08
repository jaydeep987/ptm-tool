import * as icons from 'material-design-icons';
import * as React from 'react';

import { Menu, MenuItem } from 'material-ui';
import { FontIcon } from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Icon } from '..';

const Items = styled.ul`
  padding: 2px;

  li {
    list-style: none;
    padding: 5px;
  }
`;

export default class SidebarItems extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    return(
      <div>
        <Menu>
          <MenuItem primaryText="Home" leftIcon={<Icon name="home" />} />
          <MenuItem primaryText="JIRA AssignHistory Timeline" containerElement={<Link to="jiraAssignTimeline" />} leftIcon={<Icon name="timeline" />} />
        </Menu>
      </div>
    );
  }
}
