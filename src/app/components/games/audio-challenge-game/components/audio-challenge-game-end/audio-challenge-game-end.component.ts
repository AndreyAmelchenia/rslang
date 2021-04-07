import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { API_URL } from '../../constants/audio-challenge.constants';
import { AudioChallengeState } from '../../models/game-adio-challenge.model';

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
export class AudioChallengeGameEndComponent implements OnChanges {
  @Input()
  wordState: AudioChallengeState;

  displayedColumns: string[] = ['word', 'result', 'audio'];

  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(): void {
    const arrrray = [...this.wordState?.resultList].map((item) => {
      return { ...item.word, result: item.result };
    });
    this.dataSource = new MatTableDataSource(arrrray);
    this.dataSource.sort = this.sort;
  }

  playWordAudio(audio: string) {
    const audioElement = new Audio(API_URL + audio);
    audioElement.play();
  }
}
