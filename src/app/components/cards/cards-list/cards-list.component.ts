import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { LoadWords } from 'src/app/redux/actions/words.actions';
import { AppState } from 'src/app/redux/app.state';
import { selectExpectation } from 'src/app/redux/selectors/request.selector';

export interface ExampleTab {
  group: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListComponent {
  value: string;

  asyncTabs: Observable<ExampleTab[]>;

  expectation: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.expectation = this.store.select(selectExpectation);
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { group: 0, icon: 'filter_1', color: 'blue' },
          { group: 1, icon: 'filter_2', color: 'green' },
          { group: 2, icon: 'filter_3', color: 'brown' },
          { group: 3, icon: 'filter_4', color: 'orange' },
          { group: 4, icon: 'filter_5', color: 'red' },
          { group: 5, icon: 'filter_6', color: 'gold' },
        ]);
      });
    });
  }

  addWordsGroup(group: number) {
    this.store.dispatch(LoadWords({ page: 0, group, wordsPerPage: 60 }));
    console.log(group);
  }
}
