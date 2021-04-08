import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { LoadListGame } from 'src/app/redux/actions/listGame.actions';
import { AppState } from 'src/app/redux/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private userSession: SessionService) {}

  title = 'rslang';

  ngOnInit() {
    if (this.userSession.getItem('user')) {
      this.store.dispatch(LoadListGame({ group: 3, page: 0, wordsPerPage: 20 }));
    }
  }
}
