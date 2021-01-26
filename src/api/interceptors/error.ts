import { ErrorPayload } from '@/services/types';
import store from '@/store';
import { RefreshTokenActionPayload, AuthActionType } from '@/store/auth/types';
import { getAuthFromStore } from '@/utils';
import { ErrorCodeName } from '@/utils/exceptions';
import { AxiosError, AxiosResponse, AxiosInstance } from 'axios';

type ErrorInterceptor = (e: AxiosError<ErrorPayload>) => Promise<AxiosError<ErrorPayload> | AxiosResponse>;

export const createErrorInterceptor = (api: AxiosInstance) => {
  const errorInterceptor: ErrorInterceptor = async err => {
    // eslint-disable-next-line no-console
    console.log('Interceptor', err.response);

    const error = err.response?.data?.error;

    if (error && error.name === ErrorCodeName.TOKEN_EXPIRED) {
      // Refresh token
      await store.dispatch<RefreshTokenActionPayload>({ type: AuthActionType.REFRESH_TOKEN });

      const authorization = `Bearer ${getAuthFromStore(store.state.auth)}`;
      const newConfig: typeof err.config = { ...err.config, headers: { ...err.config.headers, authorization } };
      const retry = await api(newConfig);
      return retry;
    }

    return Promise.reject(err);
  };
  return errorInterceptor;
};
