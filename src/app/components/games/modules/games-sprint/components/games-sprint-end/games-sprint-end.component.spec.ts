import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSprintEndComponent } from './games-sprint-end.component';

describe('GamesSprintEndComponent', () => {
  let component: GamesSprintEndComponent;
  let fixture: ComponentFixture<GamesSprintEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesSprintEndComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSprintEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
