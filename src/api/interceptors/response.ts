import { AxiosResponse, AxiosInstance } from 'axios';
import { PayloadOrError, ErrorPayload, Payload } from '@/services/types';

type ResponseInterceptor = (r: AxiosResponse<PayloadOrError>) => Promise<any> | AxiosResponse<Payload<{}>>;

export const createResponseInterceptor = (_api: AxiosInstance) => {
  const responseInterceptor: ResponseInterceptor = response => {
    const error = (response.data as ErrorPayload).error;
    if (error) {
      return Promise.reject<any>(error);
    }
    return response as AxiosResponse<Payload<{}>>;
  };
  return responseInterceptor;
};
