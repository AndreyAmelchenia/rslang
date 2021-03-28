import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { WordsService } from 'src/app/common/services/words-service/words.service';

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

        return this.wordsService.aggregatedWords(group, page, wordsPerPage).pipe(
          map((word) => {
            console.log(word);
            return retrievedWordsList({ Words: word });
          }),
        );
      }),
    );
  });
}
