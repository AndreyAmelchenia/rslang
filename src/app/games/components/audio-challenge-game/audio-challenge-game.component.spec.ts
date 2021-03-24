import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioChallengeGameComponent } from './audio-challenge-game.component';

describe('AudioChallengeGameComponent', () => {
  let component: AudioChallengeGameComponent;
  let fixture: ComponentFixture<AudioChallengeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioChallengeGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioChallengeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
