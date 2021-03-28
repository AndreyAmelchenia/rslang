import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { WordsService } from 'src/app/services/words.service';
import { LoadWords, retrievedWordsList } from '../actions/words.actions';

@Injectable()
export class WordsEffects {
  constructor(
    private actions$: Actions,
    private wordsService: WordsService,
    private store: Store,
  ) {}

  loadMovies$ = createEffect(() => {
    // this.store.dispatch(expectationRequest({ expectation: false }));
    return this.actions$.pipe(
      ofType(LoadWords),
      mergeMap(({ group, page, wordsPerPage }) => {
        console.log(group, page, wordsPerPage);

        return this.wordsService.aggregatedWords(group, page, wordsPerPage).pipe(
          map((word) => {
            console.log(word);
            // this.store.dispatch(expectationRequest({ expectation: true }));
            return retrievedWordsList({ Words: word[0].paginatedResults });
          }),
        );
      }),
    );
  });
}
// ofType('[Movies Page] Load Movies'),
// mergeMap(() =>
//   this.moviesService.getAll().pipe(
//     map((movies) => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
//     catchError(() => of({ type: '[Movies API] Movies Loaded Error' })),
//   ),
// ),
// map((words) => ({ type: '[Word List/API] Retrieve Words Success', payload: words })),
