import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { retrievedWordsList } from './state/actions/words.actions';
import { WordsService } from './services/words.service';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rslang';

  constructor(private wordsService: WordsService, private store: Store<AppState>) {}

  ngOnInit() {
    this.wordsService
      .getWords()
      .subscribe((Words) => this.store.dispatch(retrievedWordsList({ Words })));
  }
}
