import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlConstants } from 'src/app/shared/constants/url-constants';
import { GameModel } from 'src/app/common/models/games.model';

const url = UrlConstants.urlGamesData;

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<GameModel[]>(url);
  }
}
