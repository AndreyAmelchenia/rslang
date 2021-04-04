import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSprintCardComponent } from './games-sprint-card.component';

describe('GamesSprintCardComponent', () => {
  let component: GamesSprintCardComponent;
  let fixture: ComponentFixture<GamesSprintCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesSprintCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSprintCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
