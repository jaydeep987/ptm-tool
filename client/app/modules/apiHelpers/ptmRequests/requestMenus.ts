import config from '../../../../config';

import { AxiosPromise, AxiosRequestConfig } from 'axios';
import getApiInstance, { getCommonReqConfig, IApi, IRequestOptions } from '../apiInstance';

const apiInstance = getApiInstance(IApi.PTM);

function loadAllMenus(options: IRequestOptions = {}): AxiosPromise<any> {
  const reqConfig: AxiosRequestConfig = {
    ...getCommonReqConfig(options),
    url: `${config.ptmApiBaseUrl}/menus`,
  };

  return apiInstance.request(reqConfig);
}

export {
  loadAllMenus,
};
