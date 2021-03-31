import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import { ActionType } from '../models/action.models';

import { AuthService } from '../../components/navigation/services/auth.service';
import { IUser } from '../models/user.modele';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionType.LogIn),
      exhaustMap((action: any) =>
        this.authService.loginUser(action.user).pipe(
          map((user: IUser) => authActions.loginSuccess(user)),
          catchError((error) => of(authActions.loginFailure({ error }))),
        ),
      ),
    ),
  );

  loginToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.LogInSuccess),
        tap((user: any) => {
          localStorage.setItem('userId', user.userId);
          localStorage.setItem('token', user.token);
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionType.SignUp),
      switchMap((action: any) =>
        this.authService.registerUser(action.user).pipe(
          map((user) => authActions.signUpSuccess(user)),
          catchError((error) => of(authActions.signUpFailure({ error }))),
        ),
      ),
    ),
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.SignUpSuccess),
        tap(() => this.router.navigateByUrl('/')),
      ),
    { dispatch: false },
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.LogOut),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
