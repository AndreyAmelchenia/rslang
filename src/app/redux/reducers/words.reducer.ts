import { createReducer, on } from '@ngrx/store';
import { AggregatedWords, AggregatedWordsRedux } from 'src/app/common/models/aggregatedWords.model';
import { AddDifficultyWords, BackWord, retrievedWordsList } from '../actions/words.actions';

export const wordsFeatureKey = 'words';

export const initialState: Array<AggregatedWordsRedux> = [
  { totalCount: [{ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }], paginatedResults: [] },
];

const addNewWords = (
  state: Array<AggregatedWordsRedux>,
  words: AggregatedWords[],
): AggregatedWordsRedux[] => {
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
      totalCount: [
        {
          ...state[0].totalCount[0],
          [words[0].paginatedResults[0].group]: words[0].totalCount[0].count,
        },
      ],
    },
  ];
};

export const booksReducer = createReducer(
  initialState,
  on(retrievedWordsList, (state, { Words }) => addNewWords(state, Words)),
  on(BackWord, (state) => [...state]),
  on(AddDifficultyWords, (state, { wordId, difficulty, newWord }) => {
    const { group } = state[0].paginatedResults.find((el) => el._id === wordId);
    return [
      {
        ...state[0],
        paginatedResults: state[0].paginatedResults.map((el) =>
          el._id === wordId
            ? {
                ...el,
                userWord: newWord
                  ? { difficulty, optional: { repeat: 0, failCount: 0 } }
                  : { ...el.userWord, difficulty },
              }
            : el,
        ),
        totalCount: [
          {
            ...state[0].totalCount[0],
            [group]:
              difficulty === 'deleted'
                ? state[0].totalCount[0][group] - 1
                : state[0].totalCount[0][group],
          },
        ],
      },
    ];
  }),
);
