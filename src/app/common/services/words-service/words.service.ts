import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AggregatedWords } from '../../models/aggregatedWords.model';
import { Word } from '../../models/word.model';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords(): Observable<Word[]> {
    return this.http
      .get<Word[]>('https://andey-rslang-back-end.herokuapp.com/words?group=5&page=10')
      .pipe(map((words) => words));
  }

  aggregatedWords(
    group: number,
    page: number,
    wordsPerPage: number,
  ): Observable<AggregatedWords[]> {
    return this.http
      .get<AggregatedWords[]>(
        `https://andey-rslang-back-end.herokuapp.com/users/6054f3cd7584ac0015d8b7ca/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter={"$or":[{"userWord.difficulty":"easy"},{"userWord":null},{"userWord.difficulty":"hard"}]}`,
      )
      .pipe(map((words) => words));
  }

  addDifficultyWord(
    wordId: string,
    userId: string,
    difficulty: 'easy' | 'hard' | 'deleted' = 'easy',
    newWord: boolean = true,
  ): Observable<{
    wordId: string;
    difficulty: 'easy' | 'hard' | 'deleted';
    newWord: boolean;
  }> {
    if (newWord) {
      return this.http
        .post(`https://andey-rslang-back-end.herokuapp.com/users/${userId}/words/${wordId}`, {
          difficulty,
        })
        .pipe(map(() => ({ wordId, difficulty, newWord })));
    }
    return this.http
      .put(`https://andey-rslang-back-end.herokuapp.com/users/${userId}/words/${wordId}`, {
        difficulty,
      })
      .pipe(map(() => ({ wordId, difficulty, newWord })));
  }
}
