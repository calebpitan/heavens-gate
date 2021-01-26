import { CountState } from './count';
import { AuthState } from './auth';
import { CustomVue } from 'vuex';

export type RootState = {
  auth: AuthState;
  count: CountState;
};

export type ActionPayload<T, P = any> = {
  type: T;
  payload?: P;
};

export type MapStateRecord<K extends string = string> = Record<
  K,
  (this: CustomVue, state: RootState, getters: any) => any
>;
