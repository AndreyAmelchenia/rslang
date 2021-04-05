import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSavannahStaticticsComponent } from './game-savannah-statictics.component';

describe('GameSavannahStaticticsComponent', () => {
  let component: GameSavannahStaticticsComponent;
  let fixture: ComponentFixture<GameSavannahStaticticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSavannahStaticticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSavannahStaticticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
