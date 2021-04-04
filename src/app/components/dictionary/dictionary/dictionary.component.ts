import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
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
export class DictionaryComponent {
  asyncTabs: Observable<ExampleTab[]>;

  expectation: Observable<boolean>;

  tabs: any;

  tabs2: any;

  constructor(private dictionaryService: DictionaryService) {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      observer.next([
        { label: 'Изучаемые слова', icon: 'filter_1', color: 'blue' },
        { label: 'Сложные слова', icon: 'filter_2', color: 'green' },
        { label: 'Удалённые слова', icon: 'filter_3', color: 'brown' },
      ]);
    });

    this.tabs = [
      { label: 'Изучаемые слова', icon: 'filter_1', color: 'blue' },
      { label: 'Сложные слова', icon: 'filter_2', color: 'green' },
      { label: 'Удалённые слова', icon: 'filter_3', color: 'brown' },
    ];

    this.tabs2 = [
      { group: 0, icon: 'filter_1', color: [252, 0, 0] },
      { group: 1, icon: 'filter_2', color: [0, 128, 0] },
      { group: 2, icon: 'filter_3', color: [0, 0, 255] },
      { group: 3, icon: 'filter_4', color: [255, 165, 0] },
      { group: 4, icon: 'filter_5', color: [238, 130, 238] },
      { group: 5, icon: 'filter_6', color: [128, 0, 0] },
    ];
  }

  onChangePage(event) {
    this.dictionaryService.changePage(event);
  }

  onChangeGroup(event) {
    this.dictionaryService.changeGroup(event);
  }

  onChangeSection(event) {
    console.log(event);
    this.dictionaryService.changeSection(event);
  }
}
