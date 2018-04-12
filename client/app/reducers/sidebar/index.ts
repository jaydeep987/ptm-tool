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

export default combineReducers({
  sidebarToggle,
});
