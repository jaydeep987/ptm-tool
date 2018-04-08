import * as actions from '../../actions/Sidebar';

const initialState: ISidebarToggleReducerState = {
  open: true,
};

export interface ISidebarToggleReducerState {
  open: boolean;
}

export default function(state: ISidebarToggleReducerState = initialState, action) {
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
