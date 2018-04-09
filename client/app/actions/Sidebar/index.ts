import { loadAllMenus } from '../../modules/apiHelpers/ptmRequests/requestMenus';

export const ACTION_TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const ACTION_REQUEST_ALL_MENUS = 'REQUEST_ALL_MENUS';
export const ACTION_RECEIVE_ALL_MENUS = 'RECEIVE_ALL_MENUS';

export function toggleSidebar(isOpen: boolean) {
  return {
    type: ACTION_TOGGLE_SIDEBAR,
    isOpen,
  };
}

export function requestAllMenus() {
  return {
    type: ACTION_REQUEST_ALL_MENUS,
  };
}

export function receiveAllMenus(menus) {
  return {
    type: ACTION_RECEIVE_ALL_MENUS,
    menus,
  };
}

export function fetchSidebarMenus() {
  return (dispatch) => {
    dispatch(requestAllMenus());
    loadAllMenus().then((response) => dispatch(receiveAllMenus(response.data)));
  };
}
