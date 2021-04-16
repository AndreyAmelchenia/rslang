import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesEndComponent } from './games-end.component';

describe('GameEndComponent', () => {
  let component: GamesEndComponent;
  let fixture: ComponentFixture<GamesEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesEndComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
