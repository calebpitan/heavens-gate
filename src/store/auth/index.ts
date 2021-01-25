import { Module } from 'vuex';
import { heavensGate } from '@/api';
import { RootState } from '@/store/types';
import { login, refreshToken, signup } from '@/services/auth';
import { AuthMutationType, AuthActionType, SignupActionPayload, LoginActionPayload } from './types';

export type AuthStore = { data: { id: string; token: string; loggedIn: boolean } };
export type AuthStoreModule = typeof authStore;

const authStore: Module<AuthStore, RootState> = {
  state() {
    return { data: { id: '', token: '', loggedIn: false } };
  },

  mutations: {
    [AuthMutationType.SET_TOKEN](state, payload: AuthStore['data']) {
      state.data = { ...state.data, ...payload, loggedIn: true };
    },

    [AuthMutationType.SET_LOGGED_IN](state, payload: Pick<AuthStore['data'], 'loggedIn'>) {
      state.data.loggedIn = payload.loggedIn;
    },
  },

  actions: {
    async [AuthActionType.REFRESH_TOKEN](context) {
      const { data } = await refreshToken(heavensGate);
      context.commit(AuthMutationType.SET_TOKEN, data);
    },

    async [AuthActionType.SIGNUP](context, { payload }: SignupActionPayload) {
      const { data } = await signup(payload!);
      context.commit(AuthMutationType.SET_TOKEN, data);
    },

    async [AuthActionType.LOGIN](context, { payload }: LoginActionPayload) {
      const { data } = await login(payload);
      context.commit(AuthMutationType.SET_TOKEN, data);
    },
  },
};

export default authStore;
