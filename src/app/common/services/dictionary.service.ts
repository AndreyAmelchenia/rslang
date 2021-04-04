import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../../redux/models/user.models';
import { user } from '../../redux/selectors/auth.selectors';
import { URL_BACK_SERVER } from '../../shared/constants/url-constants';
import { AggregatedWords, ICurrentWords } from '../models/aggregatedWords.model';
import { filter } from '../../shared/constants/http-constans';
import { updateWords } from '../../redux/actions/dictionary.actions';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  filter = {
    learned: `{"$or":[${filter.easy},${filter.hard}]}`,
    hard: `${filter.hard}`,
    deleted: `${filter.deleted}`,
  };

  urlOptions = {
    userId: '',
    section: 'learned',
    group: 0,
    page: 0,
    wordsPerPage: 20,
  };

  initialData = {
    section: 'learned',
    group: 0,
    page: 0,
    wordsPerPage: 15,
  };

  currentData = {};

  constructor(private http: HttpClient, private store: Store) {
    this.store.select(user).subscribe((stateUser) => {
      this.urlOptions.userId = stateUser.userId;
    });
  }

  changeGroup({ index }) {
    this.urlOptions.group = index;
    this.updateWords();
  }

  changeSection({ index }) {
    switch (index) {
      case 0:
        this.urlOptions.section = 'learned';
        break;
      case 1:
        this.urlOptions.section = 'hard';
        break;
      case 2:
        this.urlOptions.section = 'deleted';
        break;
      default:
        this.urlOptions.section = 'learned';
    }
    this.updateWords();
  }

  changePage({ pageIndex }) {
    this.urlOptions.page = pageIndex;
    this.updateWords();
  }

  updateWords() {
    this.store.dispatch(updateWords());
  }

  updateUrl(id): string {
    const currentUrl = `${URL_BACK_SERVER.URL_BACK}users/${id}/aggregatedWords?group=${
      this.urlOptions.group
    }&page=${this.urlOptions.page}&wordsPerPage=${this.urlOptions.wordsPerPage}&filter=${
      this.filter[this.urlOptions.section]
    }`;
    return currentUrl;
  }

  getWords(userData: IUser): Observable<ICurrentWords> {
    return this.http
      .get<ICurrentWords>(this.updateUrl(userData.userId))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
