import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { AggregatedWords } from '../../models/aggregatedWords.model';
import { DifficultyWord, AggregatedWordsToGet } from '../../models/requests.model';
import { Word } from '../../models/word.model';
import { filter } from '../../../shared/constants/http-constans';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords(): Observable<Word[]> {
    return this.http
      .get<Word[]>(`${URL_BACK_SERVER}words?group=5&page=10`)
      .pipe(map((words) => words));
  }

  aggregatedWords({
    group,
    page,
    userId,
    wordsPerPage,
  }: AggregatedWordsToGet): Observable<AggregatedWords[]> {
    return this.http
      .get<AggregatedWords[]>(
        `${URL_BACK_SERVER.URL_BACK}users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter={"$or":[${filter.easy},${filter.hard},${filter.noUserWords}]}`,
      )
      .pipe(map((words) => words));
  }

  addDifficultyWord({
    wordId,
    userId,
    difficulty = 'easy',
    newWord = true,
  }: DifficultyWord): Observable<{
    wordId: string;
    difficulty: 'easy' | 'hard' | 'deleted';
    newWord: boolean;
  }> {
    if (newWord) {
      return this.http
        .post(`${URL_BACK_SERVER.URL_BACK}users/${userId}/words/${wordId}`, {
          difficulty,
        })
        .pipe(map(() => ({ wordId, difficulty, newWord })));
    }
    return this.http
      .put(`${URL_BACK_SERVER.URL_BACK}users/${userId}/words/${wordId}`, {
        difficulty,
      })
      .pipe(map(() => ({ wordId, difficulty, newWord })));
  }
}
