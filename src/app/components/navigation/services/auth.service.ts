import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../../../common/services/storage/session.service';
import { loginSuccess } from '../../../redux/actions/auth.actions';
import { IHttpUser, IUser } from '../../../redux/models/user.models';

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

  registerUser(user: FormData): Observable<IUser> {
    return this.http.post<IUser>(this.registerUrl, user);
  }

  loginUser(user: IHttpUser, reg: boolean): Observable<{ user: IUser; reg: boolean }> {
    return this.http
      .post<IUser>(this.loginUrl, user)
      .pipe(map((userRes) => ({ user: userRes, reg })));
  }

  logout() {
    this.sessionService.removeItem('token');
  }

  isAuth() {
    const user: IUser | null = this.getUser();
    if (user) {
      this.store.dispatch(loginSuccess({ user, start: true, reg: false }));
    }
  }

  authGuard(): boolean {
    const user: IUser | null = this.getUser();
    return !!user;
  }

  getUser(): IUser {
    return this.sessionService.getItem('user') || '';
  }
}
