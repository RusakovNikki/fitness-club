import { ERoles } from '../enums/roles';

export interface IAuthLoginRequest {
  username: string;
  password: string;
}

export interface IAuthLoginResponse {
  token?: string;
  type?: 'Bearer';
  id?: number;
  username?: string;
  email?: string;
  roles?: ERoles[];
}
