import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSprintMainComponent } from './games-sprint-main.component';

describe('GamesSprintComponent', () => {
  let component: GamesSprintMainComponent;
  let fixture: ComponentFixture<GamesSprintMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesSprintMainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSprintMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
