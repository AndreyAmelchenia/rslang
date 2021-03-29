import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WordsService } from 'src/app/common/services/words-service/words.service';
import { LoadWords } from 'src/app/redux/actions/words.actions';
import { AppState } from 'src/app/redux/app.state';

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
