import { createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';
import { ILoginState } from '../models/loginState.modele';

export const authFeatureKey = 'auth';

export const initialUserState: ILoginState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialUserState,
  on(authActions.loginSuccess, (state, user) => ({
    ...state,
    user: { ...user },
    isAuthenticated: true,
  })),
  on(authActions.loginFailure, (state) => ({
    ...state,
    errorMessage: 'Incorrect email and/or password.',
  })),
  on(authActions.signUpFailure, (state) => ({
    ...state,
    errorMessage: 'That email is already in use.',
  })),
  on(authActions.logout, () => initialUserState),
);
