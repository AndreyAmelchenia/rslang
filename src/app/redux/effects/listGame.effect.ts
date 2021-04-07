import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
// import { LocalStorageService } from 'src/app/common/services/storage/local.service';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { WordsService } from 'src/app/common/services/words-service/words.service';
import { ArticlesActionsGameList, gameWordsList, LoadListGame } from '../actions/listGame.actions';

import { wordsDictionary } from '../selectors/dictionary.selectors';

@Injectable()
export class GameListEffects {
  constructor(
    private actions$: Actions,
    private wordsService: WordsService,
    private userSession: SessionService,
    private store: Store,
  ) {}

  loadGameList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadListGame),
      mergeMap(({ group, page, wordsPerPage }) => {
        return this.store.select(wordsDictionary).pipe(
          mergeMap((words) => {
            if (words.length === 20) return of({ type: ArticlesActionsGameList.BackWord });
            return of(this.userSession.getItem('user')).pipe(
              mergeMap(({ userId }) => {
                return this.wordsService
                  .aggregatedGameList({
                    group,
                    page,
                    userId,
                    wordsPerPage: wordsPerPage - words.length,
                  })
                  .pipe(
                    mergeMap((wordsAdd) => {
                      if (wordsAdd[0].paginatedResults.length === 20) {
                        return of(gameWordsList({ Words: wordsAdd[0].paginatedResults }));
                      }
                      return this.wordsService
                        .aggregatedGameListNew({
                          group,
                          page,
                          userId,
                          wordsPerPage: wordsPerPage - wordsAdd[0].paginatedResults.length,
                        })
                        .pipe(
                          map((wordsAddNew) => {
                            return gameWordsList({
                              Words: wordsAdd[0].paginatedResults.concat(
                                wordsAddNew[0].paginatedResults,
                              ),
                            });
                          }),
                        );
                    }),
                  );
              }),
            );
          }),
        );
      }),
    );
  });
}
