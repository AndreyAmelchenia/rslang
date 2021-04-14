import { Component, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { API_URL } from '../../constans/audio-challenge.constants';
import { AudioChallengeState } from '../../models/game-adio-challenge.model';
import { AudioChallengeGameService } from '../../sevices/audio-challenge-game.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-audio-challenge-game-end',
  templateUrl: './audio-challenge-game-end.component.html',
  styleUrls: ['./audio-challenge-game-end.component.scss'],
})
export class AudioChallengeGameEndComponent implements OnChanges, OnDestroy {
  @Input()
  wordState: AudioChallengeState;

  displayedColumns: string[] = ['word', 'result', 'audio'];

  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  ngOnChanges(): void {
    const resultArray = [...this.wordState?.resultList].map((item) => {
      return { ...item.word, result: item.result };
    });
    this.dataSource = new MatTableDataSource(resultArray);
    this.dataSource.sort = this.sort;
  }

  playAgain() {
    this.audioChallengeGameService.gameStart();
  }

  playWordAudio(audio: string) {
    const audioElement = new Audio(API_URL + audio);
    audioElement.play();
  }

  ngOnDestroy(): void {
    this.audioChallengeGameService.closeGame();
  }
}
