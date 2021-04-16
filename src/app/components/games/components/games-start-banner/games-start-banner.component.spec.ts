import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesStartBannerComponent } from './games-start-banner.component';

describe('GamesStartBannerComponent', () => {
  let component: GamesStartBannerComponent;
  let fixture: ComponentFixture<GamesStartBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesStartBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesStartBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
