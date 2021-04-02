import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/redux/app.state';
import { IUser } from 'src/app/redux/models/user.modele';
import { userSelector } from 'src/app/redux/selectors/auth.selectors';
import { Settings } from '../models/settings.model';

const serverUrl = 'https://andey-rslang-back-end.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  userInfo: IUser;

  httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select(userSelector).subscribe((user) => {
      this.userInfo = user;
    });

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userInfo.token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  getSettings(): Observable<Settings> {
    return this.http
      .get<Settings>(`${serverUrl}users/${this.userInfo.userId}/settings`)
      .pipe(map((settings) => settings));
  }

  saveSettings(data: Settings): Observable<Settings> {
    console.log(data);
    return this.http
      .put<Settings>(`${serverUrl}users/${this.userInfo.userId}/settings`, data)
      .pipe(map((settings) => settings));
  }
}
