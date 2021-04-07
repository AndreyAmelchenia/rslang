import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AudioChallengeWord } from '../../models/game-adio-challenge.model';
import { AudioChallengeGameStateService } from '../../services/audio-challenge-game-status.service';

@Component({
  selector: 'app-audio-challenge-item',
  templateUrl: './audio-challenge-item.component.html',
  styleUrls: ['./audio-challenge-item.component.scss'],
})
export class AudioChallengeItemComponent implements OnInit, OnChanges {
  audio = new Audio();

  @Input()
  currentWord: AudioChallengeWord;

  constructor(private audioChallengeGameStateService: AudioChallengeGameStateService) {}

  ngOnInit(): void {
    console.log('hhh');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentWord } = changes;
    if (currentWord.currentValue.audio) {
      this.audio.src = `https://andey-rslang-back-end.herokuapp.com/${this.currentWord.audio}`;
    }
  }

  makeChoice() {
    this.audioChallengeGameStateService.setAuthState({ isTranslationChoosed: true });
  }

  playWordAudio() {
    this.audio.play();
  }
}
