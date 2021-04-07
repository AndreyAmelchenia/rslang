import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import { ActionType } from '../models/authAction.models';

import { AuthService } from '../../components/navigation/services/auth.service';
import { IUser } from '../models/user.models';
import { SessionService } from '../../common/services/storage/session.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionType.LogIn),
      exhaustMap((action: any) =>
        this.authService.loginUser(action.user).pipe(
          map((user: IUser) =>
            authActions.loginSuccess({
              user: {
                userId: user.userId,
                name: user.name,
                token: user.token,
              },
              start: false,
            }),
          ),
          catchError((error) => of(authActions.loginFailure({ error }))),
        ),
      ),
    ),
  );

  loginToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.LogInSuccess),
        tap((action: any) => {
          this.sessionService.setItem('user', action.user);
          if (!action.start) {
            this.router.navigateByUrl('/');
          }
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
          this.sessionService.removeItem('user');
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  isAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.isAuth),
        tap(() => this.authService.isAuth()),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
  ) {}
}
