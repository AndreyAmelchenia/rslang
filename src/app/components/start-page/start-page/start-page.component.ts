import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { isLoginSelector } from 'src/app/redux/selectors/auth.selectors';
import { AboutUs } from '../../aboutUs/models/about-us.model';
import { AboutUsService } from '../../aboutUs/services/about-us.service';

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

  safeURL: SafeResourceUrl;

  aboutUsItem: Observable<AboutUs>;

  aboutUs: AboutUs[];

  index = 0;

  colsAndRows = of({
    one: { col: 6, row: 1 },
    two: { col: 2, row: 2 },
    three: { col: 2, row: 1 },
    four: { col: 4, row: 1 },
  });

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    private aboutUsService: AboutUsService,
    public breakpointObserver: BreakpointObserver,
    private userSession: SessionService,
  ) {
    this.aboutUsService.getTeam().subscribe((aboutUs) => {
      this.aboutUs = aboutUs.reduce((acc, item) => [...acc, { ...item }], []);
    });
    this.aboutUsItem = of(this.aboutUs[this.index]);
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/1ozGKlOzEVc',
    );
    this.colsAndRows = this.breakpointObserver
      .observe([
        '(min-width: 700px)',
        '(min-width: 1060px)',
        '(min-width: 840px)',
        '(min-width: 600px)',
        '(min-width: 300px)',
      ])
      .pipe(
        mergeMap(({ breakpoints }) => {
          if (breakpoints['(min-width: 1060px)'])
            return of({
              one: { col: 7, row: 1 },
              two: { col: 2, row: 2 },
              three: { col: 3, row: 1 },
              four: { col: 4, row: 1 },
            });
          if (breakpoints['(min-width: 840px)'])
            return of({
              one: { col: 5, row: 1 },
              two: { col: 4, row: 1 },
              three: { col: 2, row: 1 },
              four: { col: 7, row: 1 },
            });
          if (breakpoints['(min-width: 700px)'])
            return of({
              one: { col: 5, row: 1 },
              two: { col: 4, row: 1 },
              three: { col: 2, row: 1 },
              four: { col: 7, row: 1 },
            });
          if (breakpoints['(min-width: 600px)'])
            return this.isAuth$.pipe(
              map((bool) => {
                if (bool) {
                  return {
                    one: { col: 9, row: 1 },
                    two: { col: 4, row: 1 },
                    three: { col: 5, row: 1 },
                    four: { col: 9, row: 1 },
                  };
                }
                return {
                  one: { col: 5, row: 1 },
                  two: { col: 2, row: 1 },
                  three: { col: 2, row: 1 },
                  four: { col: 7, row: 1 },
                };
              }),
            );
          if (breakpoints['(min-width: 300px)'])
            return this.isAuth$.pipe(
              map((bool) => {
                if (bool) {
                  return {
                    one: { col: 9, row: 1 },
                    two: { col: 9, row: 1 },
                    three: { col: 9, row: 1 },
                    four: { col: 9, row: 1 },
                  };
                }
                return {
                  one: { col: 7, row: 1 },
                  two: { col: 7, row: 1 },
                  three: { col: 7, row: 1 },
                  four: { col: 7, row: 1 },
                };
              }),
            );
          return this.isAuth$.pipe(
            map((bool) => {
              if (bool) {
                return {
                  one: { col: 9, row: 1 },
                  two: { col: 9, row: 1 },
                  three: { col: 9, row: 1 },
                  four: { col: 9, row: 1 },
                };
              }
              return {
                one: { col: 7, row: 1 },
                two: { col: 7, row: 1 },
                three: { col: 7, row: 1 },
                four: { col: 7, row: 1 },
              };
            }),
          );
        }),
      );
  }

  tiles: Tile[] = [
    { text: 'one', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  ngOnInit() {
    this.isAuth$ = this.store.select(isLoginSelector).pipe(map((el) => !el));
  }

  nextItem(index: number) {
    this.index = index;
    this.aboutUsItem = of(this.aboutUs[index % 8]);
  }
}
