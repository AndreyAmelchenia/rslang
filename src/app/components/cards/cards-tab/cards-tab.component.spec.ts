import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { State, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { AggregatedWordsRedux } from 'src/app/common/models/aggregatedWords.model';
import { AppState } from 'src/app/redux/app.state';
import { CardsTabComponent } from './cards-tab.component';
/*
const paginatorMock: MatPaginator = {
  page: 
}
*/
/*
const paginatorMock: MatPaginator = {
  page: of(PageEvent),
}*/
const wordsMock: AggregatedWordsRedux[] = [
  {
    paginatedResults: [
      {
        _id: 'string',
        page: 2,
        group: 2,
        word: 'string',
        image: 'string',
        audio: 'string',
        audioMeaning: 'string',
        audioExample: 'string',
        textMeaning: 'string',
        textExample: 'string',
        transcription: 'string',
        wordTranslate: 'string',
        textMeaningTranslate: 'string',
        textExampleTranslate: 'string',
        userWord: {
          difficulty: 'hard',
          optional: {
            repeat: 5,
            failCount: 2,
          },
        },
      }
    ],
  totalCount: [{ 0: 5, 1: 6, 2: 4, 3: 4, 4: 8, 5: 1 }],
  }
];

const initialState: AppState = {
  words: wordsMock,
  expectation: true,
  login: {
    isAuthenticated: true,
    user: {
      message: 'string',
      token: 'string',
      refreshToken: 'string',
      userId: 'string',
      name: 'string',
      photo: 'string',
    },
    errorMessage: 'string',
  },
  dictionary: {
    paginatedResults: [
      {
        _id: 'string',
        page: 2,
        group: 2,
        word: 'string',
        image: 'string',
        audio: 'string',
        audioMeaning: 'string',
        audioExample: 'string',
        textMeaning: 'string',
        textExample: 'string',
        transcription: 'string',
        wordTranslate: 'string',
        textMeaningTranslate: 'string',
        textExampleTranslate: 'string',
        userWord: {
          difficulty: 'hard',
          optional: {
            repeat: 5,
            failCount: 2,
          },
        },
      },
    ],
    totalCount: 10,
    errorMessage: 'string',
  },
  settings: {
    wordsPerDay: 10,
    optional: {
      displayTranslation: true,
      displayHandlingButtons: true,
    },
    id: 8,
  },
  stats: {
    totalLearned: 52,
    totalRightPercent: 85,
    longestSeries: {
      savanna: 25,
      sprint: 10,
      audio: 15,
      myGame: 21,
    },
    dailyStatus: {
      learned: 10,
      rightPercent: 85,
    },
  },
  gameList: [
    {
      _id: 'string',
      page: 2,
      group: 2,
      word: 'string',
      image: 'string',
      audio: 'string',
      audioMeaning: 'string',
      audioExample: 'string',
      textMeaning: 'string',
      textExample: 'string',
      transcription: 'string',
      wordTranslate: 'string',
      textMeaningTranslate: 'string',
      textExampleTranslate: 'string',
      userWord: {
        difficulty: 'hard',
        optional: {
          repeat: 5,
          failCount: 2,
        },
      },
    },
  ],
}

describe('CardsTabComponent', () => {
  let component: CardsTabComponent;
  let fixture: ComponentFixture<CardsTabComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsTabComponent],
      imports: [HttpClientModule, MatPaginatorModule, NoopAnimationsModule, StoreModule.forRoot({})],
      providers: [provideMockStore({ initialState: { words: { wordsMock }} })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    store.setState({ });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsTabComponent);
    component = fixture.componentInstance;
  //  component.paginator = paginatorMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
