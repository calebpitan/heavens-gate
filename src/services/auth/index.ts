import { AxiosInstance } from 'axios';
import Bowser from 'bowser';
import { heavensGate as api } from '@/api';
import { CredentialDto, CreateUserDto, SessionDto } from './dto';
import { Authorization, AuthStatus } from './types';
import { Payload } from '../types';

export const getClientEnvironment = () => Bowser.parse(window.navigator.userAgent);

const createAuthParams = (client: ReturnType<typeof getClientEnvironment>) => {
  const { os, platform, browser } = client;
  const [device_name, device_version, device_type, browser_name] = [os.name, os.version, platform.type, browser.name];

  return { device_name, device_version, device_type, browser_name };
};

export async function getAuthStatus() {
  const res = await api.get<Payload<AuthStatus>>('/auth/status');
  return res.data;
}

export async function login(credential: CredentialDto) {
  const params = createAuthParams(getClientEnvironment());
  const res = await api.post<Payload<Authorization>>('/auth/login', credential, { params });
  return res.data;
}

export async function signup(user: CreateUserDto) {
  const params = createAuthParams(getClientEnvironment());
  const res = await api.post<Payload<Authorization>>('/auth/create', user, { params });
  return res.data;
}

export async function refreshToken(api: AxiosInstance) {
  const params = createAuthParams(getClientEnvironment());
  const res = await api.get<Payload<Authorization>>('/auth/sessions/refresh', { params });
  return res.data;
}

export async function revokeSession(session: SessionDto) {
  const res = await api.delete<Payload<SessionDto>>('/auth/sessions/revoke', { data: JSON.stringify(session) });
  return res.data;
}

export async function resetSession() {
  const res = await api.delete<Payload<null>>('/auth/sessions/reset');
  return res.data;
}
