import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSettingsComponent } from './games-settings.component';

describe('GamesSettingsComponent', () => {
  let component: GamesSettingsComponent;
  let fixture: ComponentFixture<GamesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
