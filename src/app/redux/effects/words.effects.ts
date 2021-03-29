import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { WordsService } from 'src/app/common/services/words-service/words.service';
import { expectationRequest } from '../actions/request.actions';

import { LoadWords, retrievedWordsList } from '../actions/words.actions';

@Injectable()
export class WordsEffects {
  constructor(
    private actions$: Actions,
    private wordsService: WordsService,
    private store: Store,
  ) {}

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadWords),
      mergeMap(({ group, page, wordsPerPage }) => {
        console.log(group, page, wordsPerPage);
        this.store.dispatch(expectationRequest({ expectation: false }));
        return this.wordsService.aggregatedWords(group, page, wordsPerPage).pipe(
          map((word) => {
            console.log(word);
            this.store.dispatch(expectationRequest({ expectation: true }));
            return retrievedWordsList({ Words: word });
          }),
        );
      }),
    );
  });
}
