import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSprintPlayComponent } from './games-sprint-play.component';

describe('GamesSprintPlayComponent', () => {
  let component: GamesSprintPlayComponent;
  let fixture: ComponentFixture<GamesSprintPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesSprintPlayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSprintPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
