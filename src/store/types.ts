import { CountStore } from './count';
import { AuthStore } from './auth';

export type RootState = {
  auth: AuthStore;
  count: CountStore;
};

export type ActionPayload<T, P = undefined> = {
  type: T;
  payload: P;
};
