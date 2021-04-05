import { createAction, props } from '@ngrx/store';
import { ActionType } from '../models/action.models';
import { IHttpUser, IUser } from '../models/user.modele';

export const login = createAction(ActionType.LogIn, props<{ user: IHttpUser }>());
export const loginSuccess = createAction(
  ActionType.LogInSuccess,
  props<{ user: IUser; start: boolean }>(),
);
export const loginFailure = createAction(ActionType.LogInFailure, props<any>());
export const signUp = createAction(ActionType.SignUp, props<{ user: IHttpUser }>());
export const signUpSuccess = createAction(ActionType.SignUpSuccess, props<any>());
export const signUpFailure = createAction(ActionType.SignUpFailure, props<any>());
export const logout = createAction(ActionType.LogOut);
export const isAuth = createAction(ActionType.isAuth);
