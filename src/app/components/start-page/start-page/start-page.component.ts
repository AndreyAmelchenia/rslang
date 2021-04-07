import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isLogin } from 'src/app/redux/selectors/auth.selectors';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text?: string;
}
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(private store: Store) {}

  tiles: Tile[] = [
    { text: 'one', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  ngOnInit() {
    this.isAuth$ = this.store.select(isLogin).pipe(map((el) => !el));
  }
}
