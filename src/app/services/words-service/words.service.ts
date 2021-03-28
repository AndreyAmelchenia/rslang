import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Word } from '../../models/word.model';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords(): Observable<Array<Word>> {
    return this.http
      .get<Word[]>('https://andey-rslang-back-end.herokuapp.com/words?group=1&page=1')
      .pipe(map((words) => words || []));
  }
}
