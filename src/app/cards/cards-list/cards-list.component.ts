import { Component } from '@angular/core';
import { Word } from 'src/app/models/word.model';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const words = [
  {
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
  },
  {
    id: '60534d44d1a3081aa4990f7b',
    word: 'seek',
    image: 'files/02_0638.jpg',
    audio: 'files/02_0638.mp3',
    audioMeaning: 'files/02_0638_meaning.mp3',
    audioExample: 'files/02_0638_example.mp3',
    textMeaning: 'To seek is to look for something',
    textExample: 'If I have a problem, I seek my sister’s advice',
    transcription: '[siːk]',
    wordTranslate: 'стремиться',
    textMeaningTranslate: 'Искать значит искать что-то',
    textExampleTranslate: 'Если у меня есть проблема, я обращаюсь к совету моей сестры',
    page: 1,
    group: 1,
  },
];

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent {
  public words: Word[];

  public value: string;

  constructor() {
    this.value = 'mu input';
    this.words = words;
  }

  pagination: any = true;

  // slides2 = ['slide 1', 'slide 2', 'slide 3'];

  // replaceSlides() {
  //   this.slides2 = ['foo', 'bar'];
  // }

  // togglePagination() {
  //   if (!this.pagination) {
  //     this.pagination = { type: 'fraction' };
  //   } else {
  //     this.pagination = false;
  //   }nextCard($event)
  // }

  setThumbsSwiper(swiper) {
    console.log(swiper);
    // console.log($event.key);
  }

  // onSwiper(swiper) {
  //   console.log(swiper);
  // }

  onSlideChange() {
    console.log('slide change');
  }
}
