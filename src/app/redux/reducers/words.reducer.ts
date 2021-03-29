import { createReducer, on } from '@ngrx/store';
import { AggregatedWords } from 'src/app/common/models/aggregatedWords.model';
import { BackWord, retrievedWordsList } from '../actions/words.actions';

export const wordsFeatureKey = 'words';

export const initialState: Array<AggregatedWords> = [
  { totalCount: [{ count: 0 }], paginatedResults: [] },
];

const addNewWords = (
  state: Array<AggregatedWords>,
  words: AggregatedWords[],
): AggregatedWords[] => {
  return [
    {
      ...state[0],
      paginatedResults: words[0].paginatedResults.reduce(
        (acc, item) => [
          ...acc,
          ...(acc.filter((el) => el.word === item.word).length ? [] : [item]),
        ],
        state[0].paginatedResults,
      ),
      totalCount: [{ count: words[0].totalCount[0].count }],
    },
  ];
};

export const booksReducer = createReducer(
  initialState,
  on(retrievedWordsList, (state, { Words }) => addNewWords(state, Words)),
  on(BackWord, (state) => [...state]),
);
