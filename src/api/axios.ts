import axios, { AxiosInterceptorManager, AxiosResponse } from 'axios';
import { PayloadOrError } from '@/services/types';
import { createResponseInterceptor } from './interceptors/response';
import { createErrorInterceptor } from './interceptors/error';
import { AxiosRequestConfig } from 'axios';
import { createRequestInterceptor } from './interceptors';

export const heavensGate = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000,
  withCredentials: true,
  headers: { accept: 'application/json' },
});

export const injectToken = (token: string) => {
  heavensGate.defaults.headers.authorization = `Bearer ${token}`;
  return heavensGate;
};

const requestInterceptor = createRequestInterceptor(heavensGate);
const responseInterceptor = createResponseInterceptor(heavensGate);
const errorInterceptor = createErrorInterceptor(heavensGate);

const interceptedResponse = heavensGate.interceptors.response as AxiosInterceptorManager<AxiosResponse<PayloadOrError>>;
const interceptedRequest = heavensGate.interceptors.request as AxiosInterceptorManager<AxiosRequestConfig>;

interceptedRequest.use(requestInterceptor);
interceptedResponse.use(responseInterceptor, errorInterceptor);
