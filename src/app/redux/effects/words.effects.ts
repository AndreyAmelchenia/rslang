import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
// import { LocalStorageService } from 'src/app/common/services/storage/local.service';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { WordsService } from 'src/app/common/services/words-service/words.service';
import { syncWords } from '../actions/dictionary.actions';
import { expectationRequest } from '../actions/request.actions';

import {
  AddDifficultyWords,
  ArticlesActions,
  LoadDifficultyWords,
  LoadWords,
  retrievedWordsList,
  LoadDeletedWords,
} from '../actions/words.actions';
import {
  selectBoolLengthWordsByGroup,
  selectBoolLengthWordsByGroupAndDeleted,
  selectWords,
} from '../selectors/words.selector';

@Injectable()
export class WordsEffects {
  constructor(
    private actions$: Actions,
    private wordsService: WordsService,
    private userSession: SessionService,
    private store: Store,
  ) {}

  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadWords),
      mergeMap(({ group, page, wordsPerPage }) => {
        return this.store.select(selectBoolLengthWordsByGroup(group, page, wordsPerPage)).pipe(
          mergeMap((bool) => {
            if (bool) return of({ type: ArticlesActions.BackWord });
            if (!page) this.store.dispatch(expectationRequest({ expectation: false }));
            return of(this.userSession.getItem('user')).pipe(
              mergeMap(({ userId }) => {
                return this.wordsService
                  .aggregatedWords({ group, page, userId, wordsPerPage })
                  .pipe(
                    map((word) => {
                      if (!page) this.store.dispatch(expectationRequest({ expectation: true }));
                      return retrievedWordsList({ Words: word });
                    }),
                  );
              }),
            );
          }),
        );
      }),
    );
  });

  loadDeletedWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadDeletedWords),
      mergeMap(({ group, page, wordsPerPage }) => {
        return this.store
          .select(selectBoolLengthWordsByGroupAndDeleted(group, page, wordsPerPage))
          .pipe(
            mergeMap((bool) => {
              if (bool) return of({ type: ArticlesActions.BackWord });
              if (!page) this.store.dispatch(expectationRequest({ expectation: false }));
              return of(this.userSession.getItem('user')).pipe(
                mergeMap(({ userId }) => {
                  return this.wordsService
                    .aggregatedWords({ group, page, userId, wordsPerPage })
                    .pipe(
                      map((word) => {
                        if (!page) this.store.dispatch(expectationRequest({ expectation: true }));
                        return retrievedWordsList({ Words: word });
                      }),
                    );
                }),
              );
            }),
          );
      }),
    );
  });

  addDifficultyWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadDifficultyWords),
      mergeMap(({ wordId, difficulty, newWord }) => {
        return of(this.userSession.getItem('user')).pipe(
          mergeMap(({ userId }) => {
            return this.wordsService
              .addDifficultyWord({ wordId, userId, difficulty, newWord })
              .pipe(map(() => AddDifficultyWords({ wordId, difficulty, newWord })));
          }),
        );
      }),
    );
  });

  syncWords$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(syncWords),
        concatLatestFrom(() => this.store.select(selectWords)),
        tap(([{ word, user }, [{ paginatedResults }]]) =>
          this.wordsService.addWordToResult(word, user, paginatedResults),
        ),
      );
    },
    { dispatch: false },
  );
}
