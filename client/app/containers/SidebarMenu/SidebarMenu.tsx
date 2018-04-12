import * as React from 'react';

import Loadable = require('react-loadable');

import { Loading } from '../../components';
import { loadAllMenus } from '../../modules/apiHelpers/ptmRequests/requestMenus';

const AsyncSidebarMenu = Loadable.Map({
  loader: {
    Sidebar: () => import('../../components/Sidebar/Sidebar'),
    sidebarMenuData: () => loadAllMenus().then((response) => response.data),
  },
  loading: () => <Loading size={40} left={150} top={150} />,
  render(loaded, props) {
    const Component = loaded.Sidebar.default;
    const menus = loaded.sidebarMenuData || [];

    return <Component {...props} menus={menus} />;
  },
});

export default AsyncSidebarMenu;
