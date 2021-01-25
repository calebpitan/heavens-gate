import { AxiosRequestConfig, AxiosInstance } from 'axios';
import store from '@/store';
import { getAuthFromStore } from '@/utils';
import { guarded } from '@/api/endpoints';

type RequestInterceptor = (r: AxiosRequestConfig) => AxiosRequestConfig;

export const createRequestInterceptor = (_api: AxiosInstance) => {
  const requestInterceptor: RequestInterceptor = config => {
    const [method, url] = [config.method?.toUpperCase(), config.url];
    console.log(method, url);
    if (guarded.includes(`${method}${url}`)) {
      config.headers.authorization = getAuthFromStore(store.state.auth);
    }
    return config;
  };
  return requestInterceptor;
};
