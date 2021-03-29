import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, merge } from 'rxjs';
import { Word } from 'src/app/common/models/word.model';
import { delay, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { selectWordsByGroup } from 'src/app/redux/selectors/words.selector';
@Component({
  selector: 'app-cards-tab',
  templateUrl: './cards-tab.component.html',
  styleUrls: ['./cards-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsTabComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() group: number;

  words: Observable<Word[]>;

  data: Observable<Word[]>;

  cols = 2;

  length: number;

  constructor(public breakpointObserver: BreakpointObserver, private store: Store<AppState>) {
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.cols = 1;
      } else {
        this.cols = 2;
      }
    });
  }

  connect(): Observable<Word[]> {
    const dataMutations = [this.data, this.paginator.page];
    return merge(...dataMutations).pipe(
      delay(0),
      map(() => {
        let words: Word[];
        this.data.subscribe((data) => {
          words = data;
        });
        return this.getPagedData([...(words || [])]);
      }),
    );
  }

  private getPagedData(data: Word[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  ngOnInit(): void {
    this.data = this.store.select(selectWordsByGroup(this.group)).pipe(
      map((words) => {
        return words[0].paginatedResults;
      }),
    );
    this.store.select(selectWordsByGroup(this.group)).subscribe((words) => {
      this.length = words[0].totalCount[0].count;
    });
  }

  ngAfterViewInit() {
    this.words = this.connect();
  }
}
