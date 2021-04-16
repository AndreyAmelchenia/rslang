import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

// import { filter, map } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { GamesListComponent } from './games-list.component';
import { GamesService } from '../../../../common/services/games.service';
import { GameModel } from '../../../../common/models/games.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const testGames: GameModel[] = [
  {
    id: 11,
    name: 'Name1',
    nameRU: 'Игра1',
    img: 'img1.png',
  },
  {
    id: 12,
    name: 'Name2',
    nameRU: 'Игра1',
    img: 'img2.png',
  },
];

const testState: BreakpointState = {
  matches: true,
  breakpoints: {
    '600px': true,
  },
};

describe('GamesListComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let service: BreakpointObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesListComponent],
      providers: [
        { provide: GamesService, useValue: { getGames: () => of(testGames) } },
        { provide: BreakpointObserver, useValue: { observe: () => of(testState) } },
      ],
      imports: [HttpClientModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change css layout', () => {
    service = TestBed.inject(BreakpointObserver);
    service.observe('600px').subscribe((state) => expect(state).toBe(testState));
  });
});
