import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import config from '../../../config';

const axiosConfig: AxiosRequestConfig = {
  baseURL: config.apiDomain,
  timeout: 3000,
};

const apiInstance: AxiosInstance = axios.create(axiosConfig);

export default apiInstance;
