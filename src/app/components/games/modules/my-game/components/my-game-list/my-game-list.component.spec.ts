import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { Word } from 'src/app/common/models/word.model';
import { MyGameListComponent } from './my-game-list.component';

const wordsMock: Word[] = [
  {
    _id: 'id1',
    page: 1,
    group: 1,
    word: 'word1',
    image: 'img1',
    audio: 'audio1',
    audioMeaning: 'audioMeaning1',
    audioExample: 'audioExaple1',
    textMeaning: 'textMeaning1',
    textExample: 'textExample1',
    transcription: 'transcription1',
    wordTranslate: 'wordTranslate1',
    textMeaningTranslate: 'textMeaningTranslate1',
    textExampleTranslate: 'textExampleTranslate1',
    userWord: {
      difficulty: 'easy',
      optional: {
        repeat: 1,
        failCount: 0,
      },
    },
  },
  {
    _id: 'id2',
    page: 2,
    group: 2,
    word: 'word2',
    image: 'img2',
    audio: 'audio2',
    audioMeaning: 'audioMeaning2',
    audioExample: 'audioExaple2',
    textMeaning: 'textMeaning2',
    textExample: 'textExample2',
    transcription: 'transcription2',
    wordTranslate: 'wordTranslate2',
    textMeaningTranslate: 'textMeaningTranslate2',
    textExampleTranslate: 'textExampleTranslate2',
    userWord: {
      difficulty: 'hard',
      optional: {
        repeat: 2,
        failCount: 1,
      },
    },
  },
];

describe('MyGameListComponent', () => {
  let component: MyGameListComponent;
  let fixture: ComponentFixture<MyGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyGameListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGameListComponent);
    component = fixture.componentInstance;
    component.words = wordsMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
