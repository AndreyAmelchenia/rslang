import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Word } from 'src/app/models/word.model';
import { delay, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { selectWords } from 'src/app/redux/selectors/words.seletor';
import { expectationRequest } from 'src/app/redux/actions/request.actions';
import { selectExpectation } from 'src/app/redux/selectors/request.selector';
// import { WORDS } from '../data/words';
@Component({
  selector: 'app-cards-tab',
  templateUrl: './cards-tab.component.html',
  styleUrls: ['./cards-tab.component.scss'],
})
export class CardsTabComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  words: Observable<Word[]>;

  data: Word[];

  cols = 2;

  expectation: boolean;

  constructor(public breakpointObserver: BreakpointObserver, private store: Store<AppState>) {
    this.store.select(selectExpectation).subscribe((expectation) => {
      this.expectation = expectation;
    });
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.cols = 1;
      } else {
        this.cols = 2;
      }
    });
  }

  connect(): Observable<Word[]> {
    const dataMutations = [observableOf(this.data), this.paginator.page];
    return merge(...dataMutations).pipe(
      delay(0),
      map(() => {
        return this.getPagedData([...this.data]);
      }),
    );
  }

  private getPagedData(data: Word[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  ngOnInit(): void {
    this.store.select(selectWords).subscribe((words) => {
      this.data = words;
    });
  }

  ngAfterViewInit() {
    this.words = this.connect();
  }

  clickres() {
    this.store.dispatch(expectationRequest({ expectation: !this.expectation }));
  }
}
