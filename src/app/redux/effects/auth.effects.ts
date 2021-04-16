import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { StatsService } from 'src/app/common/services/stats.service';
import { SettingsService } from 'src/app/common/services/settings.service';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { Store } from '@ngrx/store';
import { login, loginFailure, loginSuccess, signUp, signUpFailure } from '../actions/auth.actions';
import { ActionType } from '../models/authAction.models';
import { AuthService } from '../../components/navigation/services/auth.service';
import { saveSettings } from '../actions/settings.actions';
import { saveStatistics } from '../actions/stats.actions';
import { initialState as initialStateSetting } from '../reducers/settings.reducer';
import { initialState as initialStateStats } from '../reducers/stats.reducer';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ user, reg }) =>
        this.authService.loginUser(user, reg).pipe(
          map((res) =>
            loginSuccess({
              user: {
                userId: res.user.userId,
                name: res.user.name,
                token: res.user.token,
                photo: res.user.photo,
              },
              start: false,
              reg: res.reg,
            }),
          ),
          catchError((error) => of(loginFailure({ error }))),
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
          if (action.reg) {
            this.store.dispatch(
              saveSettings({
                payload: initialStateSetting,
              }),
            );
            this.store.dispatch(
              saveStatistics({
                ...initialStateStats,
              }),
            );
          } else {
            this.settingsService.getSettingsFromServer(!action.reg);
          }
        }),
      ),
    { dispatch: false },
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap(({ user }) =>
        this.authService.registerUser(user).pipe(
          map(() => {
            return login({
              user: { email: user.get('email'), password: user.get('password') },
              reg: true,
            });
          }),
          catchError((error) => of(signUpFailure({ error }))),
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
          this.settingsService.resetSettings();
          this.statsService.resetStatistics();
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
    private store: Store,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
    private settingsService: SettingsService,
    private statsService: StatsService,
  ) {}
}
