import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GameModel } from '../models/games.model';

const url = 'assets/data/games-data.json';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<GameModel[]>(url);
  }
}
