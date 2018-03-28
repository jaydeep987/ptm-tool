import * as actions from '../../actions';

const initialHistory: object = {};

export default function(state = initialHistory, action) {
  switch (action.type) {
    case actions.ACTION_REQUEST_JIRA_HISTORY:
      return {
        ...state,
        isRequesting: true,
      };
    case actions.ACTION_RECEIVE_JIRA_HISTORY:
      return {
        ...state,
        isRequesting: false,
      };
    default:
      return state;
  }
}
