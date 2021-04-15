import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AggregatedWordsRedux } from 'src/app/common/models/aggregatedWords.model';
import { ILoginState } from 'src/app/redux/models/loginState.models';
import { isLoginSelector } from 'src/app/redux/selectors/auth.selectors';
import { selectWords } from 'src/app/redux/selectors/words.selector';

import { StartPageComponent } from './start-page.component';

const initialState: ILoginState = {
  isAuthenticated: false,
  user: {
    message: 'string',
    token: 'string',
    refreshToken: 'string',
    userId: 'string',
    name: 'string',
    photo: 'string',
  },
  errorMessage: 'string',
};

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

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartPageComponent],
      imports: [StoreModule.forRoot({})],
      providers: [ provideMockStore({ selectors: [
        {
          selector: isLoginSelector,
          value: true,
        },
        {
          selector: selectWords,
          value: wordsMock,
        }
      ] 
    }) ],
     // providers: [ provideMockStore({ initialState }) ],
    }).compileComponents();
   // store = TestBed.inject(MockStore);
  //  store.setState({ isAuthenticated: true });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPageComponent);
    
  //  store.setState({ isAuthenticated: true });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
   // store.setState({ isAuthenticated: true });
  //  fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
