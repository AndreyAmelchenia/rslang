import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AggregatedWordsRedux } from 'src/app/common/models/aggregatedWords.model';
import { DialogTotalGameComponent } from './dialog-total-game.component';

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
      },
    ],
    totalCount: [{ 0: 5, 1: 6, 2: 4, 3: 4, 4: 8, 5: 1 }],
  },
];

describe('DialogTotalGameComponent', () => {
  let component: DialogTotalGameComponent;
  let fixture: ComponentFixture<DialogTotalGameComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogTotalGameComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        provideMockStore({ initialState: { words: { wordsMock } } }),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    store.setState({ isAuthenticated: true });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTotalGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
