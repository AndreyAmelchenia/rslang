import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { totalCount, words } from 'src/app/redux/selectors/dictionary.selectors';
import { Word } from 'src/app/common/models/word.model';
import { DictionaryService } from '../../../common/services/dictionary.service';

export interface ExampleTab {
  label: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryComponent implements OnInit {
  asyncTabs: Observable<ExampleTab[]>;

  expectation: Observable<boolean>;

  tabs: any;

  tabs2: any;

  words$: Observable<Word[]>;

  totalCount$: Observable<number>;

  constructor(private dictionaryService: DictionaryService, private store: Store) {
    this.tabs = [
      { label: 'Изучаемые слова', icon: 'filter_1', color: 'blue' },
      { label: 'Сложные слова', icon: 'filter_2', color: 'green' },
      { label: 'Удалённые слова', icon: 'filter_3', color: 'brown' },
    ];
  }

  onChangePage(event) {
    this.dictionaryService.changePage(event);
  }

  onChangeGroup(event) {
    this.dictionaryService.changeGroup(event);
  }

  onChangeSection(event) {
    this.dictionaryService.changeSection(event);
  }

  ngOnInit() {
    this.words$ = this.store.select(words);
    this.totalCount$ = this.store.select(totalCount);
  }
}
