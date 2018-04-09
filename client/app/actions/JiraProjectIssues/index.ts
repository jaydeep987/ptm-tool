import { requestIssues } from '../../modules/apiHelpers/jiraRequests';

export const ACTION_REQUEST_JIRA_PROJECT_ISSUES: string = 'REQUEST_JIRA_PROJECT_ISSUES';
export const ACTION_RECEIVE_JIRA_PROJECT_ISSUES: string = 'RECEIVE_JIRA_PROJECT_ISSUES';

export function requestJiraProjectIssues(jiraProjectId): object {
  return {
    type: ACTION_REQUEST_JIRA_PROJECT_ISSUES,
    jiraProjectId,
  };
}

// TODO: do caching
export function receiveJiraProjectIssues(jiraProjectId, jiraProjectIssues): object {
  return {
    type: ACTION_RECEIVE_JIRA_PROJECT_ISSUES,
    jiraProjectId,
    jiraProjectIssues,
  };
}

export function fetchJiraProjectIssues(jiraProjectId: string) {
  return (dispatch) => {
    dispatch(requestJiraProjectIssues(jiraProjectId));
    return requestIssues.loadJiraProjectIssues(jiraProjectId)
      .then((response) => dispatch(receiveJiraProjectIssues(jiraProjectId, response.data)));
  };
}
