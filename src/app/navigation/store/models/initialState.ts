import { IUser } from './user';

export interface IState {
  isAuthenticated: boolean;
  user: IUser | null;
  errorMessage: string | null;
}
