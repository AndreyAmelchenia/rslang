import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    private aboutUsService: AboutUsService,
  ) {
    this.aboutUsService.getTeam().subscribe((aboutUs) => {
      this.aboutUs = aboutUs.reduce((acc, item) => [...acc, { ...item }], []);
    });
    this.aboutUsItem = of(this.aboutUs[this.index]);
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/1ozGKlOzEVc',
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
