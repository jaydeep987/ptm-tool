export const ACTION_REQUEST_JIRA_HISTORY: string = 'REQUEST_JIRA_HISTORY';
export const ACTION_RECEIVE_JIRA_HISTORY: string = 'RECEIVE_JIRA_HISTORY';

export function requestJiraHistory(jiraId): object {
  return {
    type: ACTION_REQUEST_JIRA_HISTORY,
    jiraId,
  };
}

export function receiveJiraHistory(jiraId, history): object {
  return {
    type: ACTION_RECEIVE_JIRA_HISTORY,
    jiraId,
    history,
  };
}

export function fetchJiraHistory(jiraId: string) {
  return (dispatch) => {
    dispatch(requestJiraHistory(jiraId));
    return fetch('http://localhost:3001/test/')
      .then((response) => response.json())
      .then((json) => setTimeout(() => dispatch(receiveJiraHistory(jiraId, json)), 3000));
  };
}
