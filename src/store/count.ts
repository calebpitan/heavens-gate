import { StoreOptions, Module } from 'vuex';
import { CountMutation } from './mutation.types';
import { RootState } from './types';

export type CountStore = { data: number };
export type CountStoreModule = typeof countStore;

const countStore: Module<CountStore, RootState> = {
  state() {
    return { data: 0 };
  },
  mutations: {
    [CountMutation.INCREMENT](state) {
      state.data++;
    },
    [CountMutation.DECREMENT](state) {
      state.data++;
    },
  },
  actions: {
    inrement(context) {
      context.commit(CountMutation.INCREMENT);
    },
    decrement(context) {
      context.commit(CountMutation.DECREMENT);
    },
  },
};

export default countStore;
