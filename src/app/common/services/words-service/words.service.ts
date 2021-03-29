import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AggregatedWords } from '../../models/aggregatedWords.model';
import { Word } from '../../models/word.model';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTRmM2NkNzU4NGFjMDAxNWQ4YjdjYSIsImlhdCI6MTYxNzA0ODgzNiwiZXhwIjoxNjE3MDYzMjM2fQ.e7jkquwvFs3a_mpjzM9c-ffCjzbf2RT5zwY2g1G7FbE';
@Injectable({
  providedIn: 'root',
})
export class WordsService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  };

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
        `https://andey-rslang-back-end.herokuapp.com/users/6054f3cd7584ac0015d8b7ca/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter={"userWord":null}`,
        this.httpOptions,
      )
      .pipe(map((words) => words));
  }
}
