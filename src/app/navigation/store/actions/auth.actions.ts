import { createAction, props } from '@ngrx/store';
import { IHttpUser } from '../models/user';

export const login = createAction('[Auth] Login', props<IHttpUser>());
