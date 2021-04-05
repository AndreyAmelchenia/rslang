import { IUser } from './user.model';

export interface ILoginState {
  isAuthenticated: boolean;
  user: IUser | null;
  errorMessage: string | null;
}
