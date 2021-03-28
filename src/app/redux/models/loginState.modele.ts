import { IUser } from './user.modele';

export interface ILoginState {
  isAuthenticated: boolean;
  user: IUser | null;
  errorMessage: string | null;
}
