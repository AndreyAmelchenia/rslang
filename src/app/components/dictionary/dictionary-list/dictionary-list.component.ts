import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { merge, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Word } from '../../../common/models/word.model';
import { LoadWords } from '../../../redux/actions/words.actions';
import { AppState } from '../../../redux/app.state';
import { selectWordsByGroup } from '../../../redux/selectors/words.selector';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() group: number;

  @Input() color: number[];

  // MatPaginator Output
  pageEvent: PageEvent;

  words: Observable<Word[]>;

  data: Observable<Word[]>;

  cols: Observable<number>;

  rowHeight: Observable<string>;

  length: number;

  lengthBase: number;

  constructor(public breakpointObserver: BreakpointObserver, private store: Store<AppState>) {
    this.cols = this.breakpointObserver.observe(['(min-width: 700px)', '(min-width: 1060px)']).pipe(
      map(({ breakpoints }) => {
        if (breakpoints['(min-width: 1060px)']) return 3;
        if (breakpoints['(min-width: 700px)']) return 2;
        return 1;
      }),
    );
    this.rowHeight = this.breakpointObserver
      .observe([
        '(min-width: 1580px)',
        '(min-width: 1360px)',
        '(min-width: 1180px)',
        '(min-width: 1058px)',
        '(min-width: 940px)',
        '(min-width: 940px)',
        '(min-width: 860px)',
        '(min-width: 699px)',
        '(min-width: 370px)',
        '(min-width: 580px)',
        '(min-width: 490px)',
        '(min-width: 440px)',
        '(min-width: 400px)',
      ])
      .pipe(
        map(({ breakpoints }) => {
          if (breakpoints['(min-width: 1580px)']) return '1.4:1';
          if (breakpoints['(min-width: 1360px)']) return '1.3:1';
          if (breakpoints['(min-width: 1180px)']) return '1.1:1';
          if (breakpoints['(min-width: 1058px)']) return '1:1';
          if (breakpoints['(min-width: 940px)']) return '1.4:1';
          if (breakpoints['(min-width: 860px)']) return '1.2:1';
          if (breakpoints['(min-width: 790px)']) return '1.1:1';
          if (breakpoints['(min-width: 699px)']) return '1:1.1';
          if (breakpoints['(min-width: 580px)']) return '1.7:1';
          if (breakpoints['(min-width: 490px)']) return '1.4:1';
          if (breakpoints['(min-width: 440px)']) return '1.2:1';
          if (breakpoints['(min-width: 400px)']) return '1.1:1';
          if (breakpoints['(min-width: 370px)']) return '1:1.1';
          return '1:1.15';
        }),
      );
  }

  @Output() changePageEvent = new EventEmitter();

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

  changePage(event) {
    this.changePageEvent.emit(event);
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
