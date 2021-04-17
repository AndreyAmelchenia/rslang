import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { StatsService } from 'src/app/common/services/stats.service';
import { SettingsService } from 'src/app/common/services/settings.service';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { Store } from '@ngrx/store';
import { AlertBarService } from '../../common/services/alert-bar.service';
import * as authActions from '../actions/auth.actions';
import { ActionType } from '../models/authAction.models';
import { IUser } from '../models/user.models';
import { AuthService } from '../../common/services/auth.service';
import { saveSettings } from '../actions/settings.actions';
import { saveStatistics } from '../actions/stats.actions';

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
                photo: user.photo,
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
            this.store.dispatch(
              saveSettings({
                payload: {
                  wordsPerDay: 10,
                  optional: {
                    displayTranslation: true,
                    displayHandlingButtons: true,
                    setGame: {
                      groupAmount: 10,
                      groupLevel: 1,
                      hideRequired: false,
                    },
                  },
                },
              }),
            );
            this.store.dispatch(
              saveStatistics({
                shortTerm: {
                  date: Date.now(),
                  audio: { learned: 0, tries: 0, right: 0, series: 0 },
                  myGame: { learned: 0, tries: 0, right: 0, series: 0 },
                  savanna: { learned: 0, tries: 0, right: 0, series: 0 },
                  sprint: { learned: 0, tries: 0, right: 0, series: 0 },
                },
                longTerm: [{ date: Date.now(), learned: 0 }],
              }),
            );
          } else {
            this.settingsService.getSettingsFromServer();
            this.statsService.getStatisticsFromServer();
          }
        }),
      ),
    { dispatch: false },
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUp),
      switchMap(({ user }) =>
        this.authService.registerUser(user).pipe(
          map(() => {
            return authActions.signUpSuccess({
              user: { email: user.get('email'), password: user.get('password') },
            });
          }),
          catchError((error) => of(authActions.signUpFailure({ error }))),
        ),
      ),
    ),
  );

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionType.SignUpSuccess),
      map((user) => authActions.login(user)),
    ),
  );

  signUpFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.SignUpFailure),
        tap(() =>
          this.alertBarService.notification$.next('Пользователь с такой почтой уже существует'),
        ),
      ),
    { dispatch: false },
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.LogInFailure),
        tap(() => this.alertBarService.notification$.next('Неправильная почта или пароль')),
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
    private alertBarService: AlertBarService,
  ) {}
}
