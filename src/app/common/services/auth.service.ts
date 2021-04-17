import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './storage/session.service';
import { loginSuccess } from '../../redux/actions/auth.actions';
import { IHttpUser, IUser } from '../../redux/models/user.models';

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

  loginUser(user: IHttpUser): Observable<IUser> {
    return this.http.post<IUser>(this.loginUrl, user).pipe(catchError(this.handleError));
  }

  logout() {
    this.sessionService.removeItem('token');
  }

  isAuth() {
    const user: IUser | null = this.getUser();
    if (user) {
      this.store.dispatch(loginSuccess({ user, start: true }));
    }
  }

  authGuard(): boolean {
    const user: IUser | null = this.getUser();
    return !!user;
  }

  getUser(): IUser {
    return this.sessionService.getItem('user') || '';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      console.error(`неправильный логин или пароль`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
