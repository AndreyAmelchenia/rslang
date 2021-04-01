import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { AppState } from '../../../redux/app.state';
import { selectExpectation } from '../../../redux/selectors/request.selector';
import { ExampleTab } from '../../cards/cards-list/cards-list.component';

@Component({
  selector: 'app-dictionary-tab',
  templateUrl: './dictionary-tab.component.html',
  styleUrls: ['./dictionary-tab.component.scss'],
})
export class DictionaryTabComponent implements OnInit {
  value: string;

  asyncTabs: Observable<ExampleTab[]>;

  expectation: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      observer.next([
        { label: 'First', icon: 'filter_1', color: 'blue' },
        { label: 'Second', icon: 'filter_2', color: 'green' },
        { label: 'Third', icon: 'filter_3', color: 'brown' },
        { label: 'Four', icon: 'filter_4', color: 'orange' },
        { label: 'Five', icon: 'filter_5', color: 'red' },
        { label: 'Six', icon: 'filter_6', color: 'gold' },
      ]);
    });
  }

  ngOnInit() {
    this.expectation = this.store.select(selectExpectation);
  }
}
