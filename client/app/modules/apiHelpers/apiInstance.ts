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
  url?: string;
}

function getApiInstance(whichApi: IApi): AxiosInstance {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: config.apiDomain[whichApi],
    timeout: 3000,
  };

  const apiInstance: AxiosInstance = axios.create(axiosConfig);

  return apiInstance;
}

function getCommonReqConfig(options: IRequestOptions) {
  const reqConfig: AxiosRequestConfig = {
    method: options.method || 'get',
    params: options.params,
    data: options.data,
  };

  if (options.timeout) {
    reqConfig.timeout = options.timeout;
  }

  return reqConfig;
}

export default getApiInstance;

export {
  getCommonReqConfig,
};
