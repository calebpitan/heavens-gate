import { ActionPayload } from '@/store/types';
import { CreateUserDto, CredentialDto, SessionDto } from '@/services/auth/dto';

export enum AuthMutationType {
  SET_TOKEN = 'SET_TOKEN',
  SET_LOGGED_IN = 'SET_LOGGED_IN',
}

export enum AuthActionType {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  CHECK_LOGGED_IN = 'CHECK_LOGGED_IN',
  RESET_SESSION = 'RESET_SESSION',
  REVOKE_SESSION = 'REVOKE_SESSION',
}

export interface RefreshTokenActionPayload extends ActionPayload<AuthActionType> {
  type: AuthActionType.REFRESH_TOKEN;
}

export interface ResetSessionActionPayload extends ActionPayload<AuthActionType> {
  type: AuthActionType.REFRESH_TOKEN;
}

export interface RevokeSessionActionPayload extends ActionPayload<AuthActionType, SessionDto> {
  type: AuthActionType.REVOKE_SESSION;
}

export interface SignupActionPayload extends ActionPayload<AuthActionType, CreateUserDto> {
  type: AuthActionType.SIGNUP;
}

export interface LoginActionPayload extends ActionPayload<AuthActionType, CredentialDto> {
  type: AuthActionType.LOGIN;
}

export interface CheckLoggedInActionPayload extends ActionPayload<AuthActionType> {
  type: AuthActionType.CHECK_LOGGED_IN;
}

export type AuthActionPayload =
  | RefreshTokenActionPayload
  | ResetSessionActionPayload
  | RevokeSessionActionPayload
  | LoginActionPayload
  | SignupActionPayload
  | CheckLoggedInActionPayload;
