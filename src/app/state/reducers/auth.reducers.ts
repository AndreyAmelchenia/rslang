import { IUser } from '../models/user';

export interface State {
  isAuthenticated: boolean;
  user: IUser | null;
  errorMessage: string | null;
}

export const initialUserState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};
