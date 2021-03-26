import { createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';
import { IState } from '../models/initialState';

export const authFeatureKey = 'auth';

export const initialUserState: IState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialUserState,
  on(authActions.login, (state) => ({
    ...state,
    isAuthenticated: true,
  })),
);
