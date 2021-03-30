import { Word } from 'src/app/common/models/word.model';

export interface AudioChallengeState {
  wordsInGame: Word[];
  resultList: {
    word: Word;
    result: boolean;
  }[];
  isGameStarted: boolean;
  currentWord: AudioChallengeWord;
  audio: HTMLAudioElement;
  isTranslationChoosed: boolean;
  maxRightAnswers: number;
  previousMaxAnswers: number;
  isGameEnded: boolean;
  isSoundOn: boolean;
}

export interface AudioChallengeWord extends Word {
  translationsArray: string[];
}
