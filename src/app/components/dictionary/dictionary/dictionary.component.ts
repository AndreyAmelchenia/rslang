import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  icon: string;
  color: number[];
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
        { label: 'Изучаемые слова', icon: 'filter_1', color: [252, 0, 0] },
        { label: 'Сложные слова', icon: 'filter_2', color: [0, 128, 0] },
        { label: 'Удалённые слова', icon: 'filter_3', color: [255, 165, 0] },
      ]);
    });
  }
}
