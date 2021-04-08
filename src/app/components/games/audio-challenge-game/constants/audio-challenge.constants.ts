import { AudioChallengeState, AudioChallengeWord } from '../models/game-adio-challenge.model';

export const API_URL = 'https://andey-rslang-back-end.herokuapp.com/';

export const GAME_LENGHT = 20;

export const initialAudioChallengeWord: AudioChallengeWord = {
  _id: '',
  word: '',
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  wordTranslate: '',
  textMeaningTranslate: '',
  textExampleTranslate: '',
  translationsArray: [],
};

export const initialAudioChallengeState: AudioChallengeState = {
  wordsInGame: [],
  resultList: [],
  isGameStarted: false,
  currentWord: initialAudioChallengeWord,
  audio: new Audio(),
  isTranslationChoosed: false,
  maxRightAnswers: 0,
  previousMaxAnswers: 0,
  isGameEnded: false,
  isSoundOn: false,
};
