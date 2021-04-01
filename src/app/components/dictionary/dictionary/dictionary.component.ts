import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

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
export class DictionaryComponent {
  asyncTabs: Observable<ExampleTab[]>;

  expectation: Observable<boolean>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      observer.next([
        { label: 'Изучаемые слова', icon: 'filter_1', color: 'blue' },
        { label: 'Сложные слова', icon: 'filter_2', color: 'green' },
        { label: 'Удалённые слова', icon: 'filter_3', color: 'brown' },
      ]);
    });
  }
}
