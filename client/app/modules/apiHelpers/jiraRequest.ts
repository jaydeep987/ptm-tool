import { AxiosRequestConfig } from 'axios';

import config from '../../../config';
import getApiInstance, { IApi, IRequestOptions } from './apiInstance';

const apiInstance = getApiInstance(IApi.JIRA);

function loadJiraIssue(jiraId: string, options: IRequestOptions = {}): Promise<any> {
  const reqConfig: AxiosRequestConfig = {
    method: options.method || 'get',
    url: `${config.jiraApiBaseUrl}/${jiraId}`,
    params: options.params,
    data: options.data,
  };

  if (options.timeout) {
    reqConfig.timeout = options.timeout;
  }

  return apiInstance.request(reqConfig);
}

function loadJiraProjectIssues(jiraProjectId: string, options: IRequestOptions = {}): Promise<any> {
  const reqConfig: AxiosRequestConfig = {
    method: options.method || 'get',
    url: `${config.jiraApiBaseUrl}/search/?jql=project="${jiraProjectId}"`,
    params: options.params,
    data: options.data,
  };

  if (options.timeout) {
    reqConfig.timeout = options.timeout;
  }

  return apiInstance.request(reqConfig);
}

export {
  loadJiraIssue,
  loadJiraProjectIssues,
};
