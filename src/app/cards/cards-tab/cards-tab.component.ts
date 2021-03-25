import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Word } from 'src/app/models/word.model';
import { WordsDataSource } from './cards-datasource';
// import { WORDS } from '../data/words';

@Component({
  selector: 'app-cards-tab',
  templateUrl: './cards-tab.component.html',
  styleUrls: ['./cards-tab.component.scss'],
})
export class CardsTabComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public words: Observable<Word[]>;

  cols = 2;

  dataSource: WordsDataSource;

  constructor(public breakpointObserver: BreakpointObserver) {
    // this.words = WORDS;
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.cols = 1;
      } else {
        this.cols = 2;
      }
    });
  }

  ngOnInit(): void {
    this.dataSource = new WordsDataSource();
    console.log(this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.words = this.dataSource.connect();
    console.log(this.paginator);
  }
}
