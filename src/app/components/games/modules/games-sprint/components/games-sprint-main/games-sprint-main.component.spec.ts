import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSprintMainComponent } from './games-sprint-main.component';

describe('GamesSprintComponent', () => {
  let component: GamesSprintMainComponent;
  let fixture: ComponentFixture<GamesSprintMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesSprintMainComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
