import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSprintComponent } from './games-sprint.component';

describe('GamesSprintComponent', () => {
  let component: GamesSprintComponent;
  let fixture: ComponentFixture<GamesSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesSprintComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
