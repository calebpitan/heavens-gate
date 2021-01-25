import { createStore, ModuleTree } from 'vuex';
import authStore from './auth';
import countStore from './count';
import { RootState } from './types';

type ApplicationStore = typeof store;

const modules: ModuleTree<RootState> = {
  auth: authStore,
  count: countStore,
};

const store = createStore<RootState>({
  modules,
});

export type { ApplicationStore };

export default store;
