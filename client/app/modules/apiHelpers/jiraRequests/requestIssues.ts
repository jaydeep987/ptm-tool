import { AxiosRequestConfig } from 'axios';

import config from '../../../../config';
import getApiInstance, { getCommonReqConfig, IApi, IRequestOptions } from '../apiInstance';

const apiInstance = getApiInstance(IApi.JIRA);

function loadJiraIssue(jiraId: string, options: IRequestOptions = {}): Promise<any> {
  const reqConfig: AxiosRequestConfig = {
    ...getCommonReqConfig(options),
    url: `${config.jiraApiBaseUrl}/${jiraId}`,
  };

  return apiInstance.request(reqConfig);
}

function loadJiraProjectIssues(jiraProjectId: string, options: IRequestOptions = {}): Promise<any> {
  const reqConfig: AxiosRequestConfig = {
    ...getCommonReqConfig(options),
    url: `${config.jiraApiBaseUrl}/search/?jql=project="${jiraProjectId}"`,
  };

  return apiInstance.request(reqConfig);
}

export {
  loadJiraIssue,
  loadJiraProjectIssues,
};
