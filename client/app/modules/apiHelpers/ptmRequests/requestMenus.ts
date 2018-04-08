import getApiInstance from '..';
import config from '../../../../config';

import { AxiosRequestConfig } from 'axios';
import { IApi, IRequestOptions } from '../apiInstance';

const apiInstance = getApiInstance(IApi.PTM);

function loadAllMenus(options: IRequestOptions) {
  const reqConfig: AxiosRequestConfig = {
    method: options.method || 'get',
    url: `${config.ptmApiBaseUrl}/menus`,
    params: options.params,
    data: options.data,
  };

  if (options.timeout) {
    reqConfig.timeout = options.timeout;
  }

  return apiInstance.request(reqConfig);
}

export {
  loadAllMenus,
};
