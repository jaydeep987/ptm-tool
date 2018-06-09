import * as actions from '../../actions/JiraProjectIssues';

const initialData: IJiraHistoryIssuesReducerState = {
  isRequesting: undefined,
  issuesData: undefined,
};

export interface IJiraHistoryIssuesReducerState {
  isRequesting?: boolean;
  issuesData?: any;
}

export default (state: IJiraHistoryIssuesReducerState = initialData, action): IJiraHistoryIssuesReducerState => {
  switch (action.type) {
    case actions.ACTION_REQUEST_JIRA_PROJECT_ISSUES:
      return {
        ...state,
        isRequesting: true,
      };
    case actions.ACTION_RECEIVE_JIRA_PROJECT_ISSUES:
      return {
        ...state,
        issuesData: action.jiraProjectIssues,
        isRequesting: false,
      };
    default:
      return state;
  }
};
