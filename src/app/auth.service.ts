import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'https://andey-rslang-back-end.herokuapp.com/users';

  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
}
