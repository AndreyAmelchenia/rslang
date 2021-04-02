import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Word } from 'src/app/common/models/word.model';

@Injectable({
  providedIn: 'root',
})
export class GamesSprintService {
  constructor(private http: HttpClient) {}

  getWords() {
    return this.http.get<Word[]>('assets/data/words.json');
  }
}
