import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import config from '../../../config';

export enum IApi {
  JIRA = 'jiraApi',
  PTM = 'ptmApi',
}

export interface IRequestOptions {
  method?: string;
  params?: string;
  data?: object;
  timeout?: number;
}

function getApiInstance(whichApi: IApi): AxiosInstance {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: config.apiDomain[whichApi],
    timeout: 3000,
  };

  const apiInstance: AxiosInstance = axios.create(axiosConfig);

  return apiInstance;
}

export default getApiInstance;
