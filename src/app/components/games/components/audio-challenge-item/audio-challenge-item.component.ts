import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AudioChallengeWord } from '../../models/game-adio-challenge.model';

@Component({
  selector: 'app-audio-challenge-item',
  templateUrl: './audio-challenge-item.component.html',
  styleUrls: ['./audio-challenge-item.component.scss'],
})
export class AudioChallengeItemComponent implements OnInit, OnChanges {
  audio = new Audio();

  @Input()
  currentWord: AudioChallengeWord;

  ngOnInit(): void {
    console.log('hhh');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentWord } = changes;
    console.log(changes);
    if (currentWord.currentValue.audio) {
      this.audio.src = `https://andey-rslang-back-end.herokuapp.com/${this.currentWord.audio}`;
    }
  }

  playWordAudio() {
    this.audio.play();
  }
}
