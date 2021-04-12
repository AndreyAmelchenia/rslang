import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSavannahStartBannerComponent } from './game-savannah-start-banner.component';

describe('GameSavannahStartBannerComponent', () => {
  let component: GameSavannahStartBannerComponent;
  let fixture: ComponentFixture<GameSavannahStartBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSavannahStartBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSavannahStartBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
