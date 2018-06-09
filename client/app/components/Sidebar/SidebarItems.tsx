import * as icons from 'material-design-icons';
import * as React from 'react';

import { Menu, MenuItem, MenuItemProps } from 'material-ui';
import { FontIcon } from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { isArray } from 'util';
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

  render() {
    return(
      <div>
        <Menu>
          {this.generateAndGetMenuItems()}
        </Menu>
      </div>
    );
  }

  private generateAndGetMenuItems(): JSX.Element[] {
    const { menus } = this.props;
    const menuItems: JSX.Element[] = [];
    if (isArray(menus)) {
      menus.map((menu) => {
        const attrs: MenuItemProps = {
          primaryText: menu.name,
          leftIcon: <Icon name={menu.icon} />,
        };
        if (menu.targetRoute) {
          attrs.containerElement = <Link to={menu.targetRoute} />;
        }
        menuItems.push(<MenuItem key={menu.menuId} {...attrs} />);
      });
    }

    return menuItems;
  }
}
