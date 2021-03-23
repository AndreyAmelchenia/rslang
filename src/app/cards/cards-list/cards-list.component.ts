import { Component } from '@angular/core';

const word = {
  id: '60534d44d1a3081aa4990f7d',
  word: 'spill',
  image: 'files/02_0640.jpg',
  audio: 'files/02_0640.mp3',
  audioMeaning: 'files/02_0640_meaning.mp3',
  audioExample: 'files/02_0640_example.mp3',
  textMeaning: 'To spill is to accidentally make something fall out of its container',
  textExample: 'I spilled the coffee on the table',
  transcription: '[spil]',
  wordTranslate: 'проливать',
  textMeaningTranslate: 'Разлить - это случайно выпустить что-то из контейнера',
  textExampleTranslate: 'Я пролил кофе на стол',
  page: 1,
  group: 1,
};
@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent {
  public word: typeof word;

  public value: string;

  constructor() {
    this.value = 'mu input';
    this.word = word;
  }
}
