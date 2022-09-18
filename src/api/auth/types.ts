import { AuthUser } from 'features/auth/auth.interface';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export interface SignupRequest {
  username: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SignupResponse extends LoginResponse {}
