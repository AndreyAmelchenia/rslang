import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadWords } from './redux/actions/words.actions';
import { AppState } from './redux/app.state';

import { WordsService } from './services/words-service/words.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rslang';

  constructor(private wordsService: WordsService, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(LoadWords({ page: 1, group: 1, wordsPerPage: 60 }));
  }
}
