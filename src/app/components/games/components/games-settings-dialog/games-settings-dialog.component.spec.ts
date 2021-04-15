import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSettingsDialogComponent } from './games-settings-dialog.component';

describe('GamesSettingsDialogComponent', () => {
  let component: GamesSettingsDialogComponent;
  let fixture: ComponentFixture<GamesSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesSettingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
