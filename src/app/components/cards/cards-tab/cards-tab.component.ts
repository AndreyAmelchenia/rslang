import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, merge, of } from 'rxjs';
import { Word } from 'src/app/common/models/word.model';
import { delay, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { selectWordsByGroup } from 'src/app/redux/selectors/words.selector';
import { LoadWords } from 'src/app/redux/actions/words.actions';
@Component({
  selector: 'app-cards-tab',
  templateUrl: './cards-tab.component.html',
  styleUrls: ['./cards-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsTabComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() group: number;

  @Input() color: number[];

  words: Observable<Word[]>;

  data: Observable<Word[]>;

  cols = of(2);

  length: number;

  lengthBase: number;

  constructor(public breakpointObserver: BreakpointObserver, private store: Store<AppState>) {
    this.cols = this.breakpointObserver
      .observe([Breakpoints.Tablet])
      .pipe(map(({ matches }) => (matches ? 2 : 1)));
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
    if (
      this.lengthBase !== 0 &&
      this.lengthBase - 30 <= this.paginator.pageIndex * this.paginator.pageSize &&
      this.lengthBase < this.length
    ) {
      this.store.dispatch(
        LoadWords({ page: this.lengthBase / 60, group: this.group, wordsPerPage: 60 }),
      );
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  ngOnInit(): void {
    this.data = this.store.select(selectWordsByGroup(this.group)).pipe(
      map((words) => {
        this.lengthBase = words[0].paginatedResults.length;
        return words[0].paginatedResults;
      }),
    );
    this.store.select(selectWordsByGroup(this.group)).subscribe((words) => {
      this.length = words[0].totalCount[0][this.group];
    });
  }

  ngAfterViewInit() {
    this.words = this.connect();
  }
}
