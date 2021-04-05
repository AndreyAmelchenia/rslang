import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Word } from '../../../common/models/word.model';
import { AppState } from '../../../redux/app.state';
import { selectExpectation } from '../../../redux/selectors/request.selector';
import { ExampleTab } from '../../cards/cards-list/cards-list.component';

@Component({
  selector: 'app-dictionary-tab',
  templateUrl: './dictionary-tab.component.html',
  styleUrls: ['./dictionary-tab.component.scss'],
})
export class DictionaryTabComponent implements OnInit {
  @Input() words$: Observable<Word[]>;

  @Input() totalCount$: Observable<number>;

  @Input() group: number;

  @Input() color: number[];

  value: string;

  asyncTabs: Observable<ExampleTab[]>;

  expectation: Observable<boolean>;

  tabs: any;

  constructor(private store: Store<AppState>) {
    this.tabs = [
      { group: 0, icon: 'filter_1', color: [252, 0, 0] },
      { group: 1, icon: 'filter_2', color: [0, 128, 0] },
      { group: 2, icon: 'filter_3', color: [0, 0, 255] },
      { group: 3, icon: 'filter_4', color: [255, 165, 0] },
      { group: 4, icon: 'filter_5', color: [238, 130, 238] },
      { group: 5, icon: 'filter_6', color: [128, 0, 0] },
    ];
  }

  @Output() changePageEvent = new EventEmitter();
  @Output() changeGroupEvent = new EventEmitter();

  changePage(event) {
    this.changePageEvent.emit(event);
  }

  colorRGB(color: number[]): string {
    return `rgb(${color.join()})`;
  }

  onGroupChange(event) {
    this.changeGroupEvent.emit(event);
  }

  ngOnInit() {
    this.expectation = this.store.select(selectExpectation);
  }
}
