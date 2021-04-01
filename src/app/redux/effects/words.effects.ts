import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
// import { LocalStorageService } from 'src/app/common/services/storage/local.service';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { WordsService } from 'src/app/common/services/words-service/words.service';
import { expectationRequest } from '../actions/request.actions';

import {
  AddDifficultyWords,
  ArticlesActions,
  LoadDifficultyWords,
  LoadWords,
  retrievedWordsList,
} from '../actions/words.actions';
import { selectWordsByGroup } from '../selectors/words.selector';

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
        let bool = false;
        this.store.select(selectWordsByGroup(group)).subscribe((el) => {
          if (el[0].paginatedResults.length === (page + 1) * wordsPerPage) {
            bool = true;
          }
        });
        this.store.select(selectWordsByGroup(group));
        if (!page) this.store.dispatch(expectationRequest({ expectation: false }));
        if (bool) {
          this.store.dispatch(expectationRequest({ expectation: true }));
          return of({ type: ArticlesActions.BackWord });
        }
        return this.wordsService.aggregatedWords(group, page, wordsPerPage).pipe(
          map((word) => {
            if (!page) this.store.dispatch(expectationRequest({ expectation: true }));
            return retrievedWordsList({ Words: word });
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
              .addDifficultyWord(wordId, userId, difficulty, newWord)
              .pipe(map(() => AddDifficultyWords({ wordId, difficulty, newWord })));
          }),
        );
      }),
    );
  });
}
