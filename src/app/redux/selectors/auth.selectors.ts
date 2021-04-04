import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILoginState } from '../models/loginState.models';
import { authFeatureKey } from '../reducers/auth.reducers';

export const selectLogin = createFeatureSelector(authFeatureKey);
export const isLogin = createSelector(selectLogin, (state: ILoginState) => state.isAuthenticated);
export const user = createSelector(selectLogin, (state: ILoginState) => state.user);
