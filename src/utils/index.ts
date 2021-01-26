import { AuthState } from '@/store/auth';

export const getAuth = () => {
  try {
    const auth = window.localStorage.getItem('auth');
    return auth ? `Bearer ${auth}` : auth;
  } catch (e) {
    if (e.name !== 'ReferenceError') {
      throw e;
    }
  }
};

export const getAuthFromStore = (store: AuthState) => {
  const token = store.data.token;
  return token.length > 0 ? token : undefined;
};
