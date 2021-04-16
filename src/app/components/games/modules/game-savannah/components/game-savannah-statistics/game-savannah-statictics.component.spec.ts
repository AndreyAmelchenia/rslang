import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSavannahStatisticsComponent } from './game-savannah-statistics.component';

describe('GameSavannahStatisticsComponent', () => {
  let component: GameSavannahStatisticsComponent;
  let fixture: ComponentFixture<GameSavannahStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameSavannahStatisticsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSavannahStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
