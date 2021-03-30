import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SessionService } from '../../../common/services/storage/session.service';
import { loginSuccess } from '../../../redux/actions/auth.actions';
import { IHttpUser, IUser } from '../../../redux/models/user.modele';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'https://andey-rslang-back-end.herokuapp.com/users';

  loginUrl = 'https://andey-rslang-back-end.herokuapp.com/signin';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private store: Store,
  ) {}

  registerUser(user: IHttpUser): Observable<IUser> {
    return this.http.post<IHttpUser>(this.registerUrl, user);
  }

  loginUser(user: IHttpUser): Observable<IUser> {
    return this.http.post<IHttpUser>(this.loginUrl, user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuth() {
    const user: IUser | null = this.getToken();
    if (user) {
      this.store.dispatch(loginSuccess({ user }));
    }
  }

  getToken(): IUser {
    return this.sessionService.getItem('user');
  }
}
