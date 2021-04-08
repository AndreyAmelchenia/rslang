import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { API_URL, GAME_LENGHT } from '../../constants/audio-challenge.constants';
import { AudioChallengeState } from '../../models/game-adio-challenge.model';
import { AudioChallengeGameService } from '../../services/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-item',
  templateUrl: './audio-challenge-item.component.html',
  styleUrls: ['./audio-challenge-item.component.scss'],
})
export class AudioChallengeItemComponent implements OnChanges {
  apiUrl = API_URL;

  gameLength = GAME_LENGHT;

  @Input()
  wordState: AudioChallengeState;

  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { wordState } = changes;
    if (wordState.currentValue.currentWord.audio) {
      this.playWordAudio();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (+event.key > 0 && +event.key < 6) {
      this.makeChoice(+event.key - 1);
    }
  }

  makeChoice(index: number) {
    this.audioChallengeGameService.makeTurn(index);
  }

  playWordAudio() {
    const audio = new Audio();
    audio.src = this.apiUrl + this.wordState.currentWord.audio;
    audio.play();
  }
}
