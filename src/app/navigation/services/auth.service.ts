import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'https://andey-rslang-back-end.herokuapp.com/users';

  loginUrl = 'https://andey-rslang-back-end.herokuapp.com/signin';

  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogin() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
