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
