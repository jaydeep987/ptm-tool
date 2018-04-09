import { combineReducers, Reducer } from 'redux';

import * as actions from '../../actions/Sidebar';

const initialState: ISidebarToggleReducerState = {
  open: true,
};

export interface ISidebarToggleReducerState {
  open: boolean;
}

function sidebarToggle(state: ISidebarToggleReducerState = initialState, action) {
  switch (action.type) {
    case actions.ACTION_TOGGLE_SIDEBAR:
      return {
        ...state,
        open: action.isOpen,
      };
    default:
      return state;
  }
}

export interface ISidebarAllMenusState {
  isRequesting?: boolean;
  menus?: any;
}

const initialSidebarAllMenusState: ISidebarAllMenusState = {
  isRequesting: undefined,
  menus: {},
};

function sidebarAllMenus(state: ISidebarAllMenusState = initialSidebarAllMenusState, action) {
  switch (action.type) {
    case actions.ACTION_REQUEST_ALL_MENUS:
      return {
        ...state,
        isRequesting: true,
      };
    case actions.ACTION_RECEIVE_ALL_MENUS:
      return {
        ...state,
        isRequesting: false,
        menus: action.menus,
      };
    default:
      return state;
  }
}

export default combineReducers({
  sidebarAllMenus,
  sidebarToggle,
});
