import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ICurrentWords } from '../../common/models/aggregatedWords.model';
import { DictionaryService } from '../../common/services/dictionary.service';

import { SessionService } from '../../common/services/storage/session.service';
import { ActionType } from '../models/dictionaryAction.models';
import * as dictionaryActions from '../actions/dictionary.actions';
import { IUser } from '../models/user.models';
import { user } from '../selectors/auth.selectors';

@Injectable()
export class DictionaryEffects {
  updateWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionType.updateWords),
      concatLatestFrom(() => this.store.select(user)),
      switchMap(([, userData]) =>
        this.dictionaryService.getWords(userData).pipe(
          map((res: ICurrentWords) =>
            dictionaryActions.updateWordsSuccess({
              paginatedResults: res.paginatedResults,
              totalCount: res.totalCount,
              errorMessage: res.errorMessage,
            }),
          ),
          catchError((error) => of(dictionaryActions.updateWordsFailure({ error }))),
        ),
      ),
    ),
  );

  restoreWord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.restoreWord),
        concatLatestFrom(() => this.store.select(user)),
        tap(([action, userData]: [action: any, userData: IUser]) => {
          console.log('action', action.word, 'user', userData);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private dictionaryService: DictionaryService,
    private router: Router,
    private sessionService: SessionService,
    private store: Store,
  ) {}
}
