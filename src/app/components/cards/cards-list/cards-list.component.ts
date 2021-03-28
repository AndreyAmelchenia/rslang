import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { AppState } from 'src/app/redux/app.state';
import { selectExpectation } from 'src/app/redux/selectors/request.selector';

export interface ExampleTab {
  label: string;
  icon: string;
  color: string;
}
@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListComponent implements OnInit {
  value: string;

  asyncTabs: Observable<ExampleTab[]>;

  expectation: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'First', icon: 'filter_1', color: 'blue' },
          { label: 'Second', icon: 'filter_2', color: 'green' },
          { label: 'Third', icon: 'filter_3', color: 'brown' },
          { label: 'Four', icon: 'filter_4', color: 'orange' },
          { label: 'Five', icon: 'filter_5', color: 'red' },
          { label: 'Six', icon: 'filter_6', color: 'gold' },
        ]);
      });
    });
  }

  ngOnInit() {
    this.expectation = this.store.select(selectExpectation);
  }
}
