import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ICurrentWords } from '../../common/models/aggregatedWords.model';
import { DictionaryService } from '../../common/services/dictionary.service';

import { SessionService } from '../../common/services/storage/session.service';
import { ActionType } from '../models/dictionaryAction.models';
import * as dictionaryActions from '../actions/dictionary.actions';
import { user } from '../selectors/auth.selectors';

@Injectable()
export class DictionaryEffects {
  updateWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionType.updateWords),
      concatLatestFrom(() => this.store.select(user)),
      switchMap(([, userData]) =>
        this.dictionaryService.getWords(userData).pipe(
          map((res: ICurrentWords) => {
            console.log(res);
            console.log(res[0].totalCount.length !== 0);
            if (res[0].totalCount.length !== 0) {
              return dictionaryActions.updateWordsSuccess({
                paginatedResults: [...res[0].paginatedResults],
                totalCount: res[0].totalCount[0].count,
              });
            }
            return dictionaryActions.updateWordsSuccess({
              paginatedResults: [],
              totalCount: 0,
            });
          }),
          catchError((error) => of(dictionaryActions.updateWordsFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private dictionaryService: DictionaryService,
    private router: Router,
    private sessionService: SessionService,
    private store: Store,
  ) {}
}
