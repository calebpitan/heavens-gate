import { AuthState } from '@/store/auth';

export const getAuthFromStorage = () => {
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

export const deepCopy = (o: Record<string, any>) => {
  return JSON.parse(JSON.stringify(o));
};

export function copyIntoObject<T extends Record<string, any>>(from: T, toCtr: new () => T): T {
  const to = new toCtr();
  const data: T = deepCopy(from);
  const keys: Array<keyof T> = Object.keys(from);
  keys.forEach(key => (to[key] = data[key]));
  return to;
}

export function resetValidation<T extends Record<string, boolean>>(validation: T) {
  const keys = Object.keys(validation) as Array<keyof T>;
  keys.forEach(key => (validation[key] = true as T[typeof key]));
}
