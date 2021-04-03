import { GameSavannahLangs } from './game-savannah-langs.enum';

export interface GameSavannahStatus {
  errors: number;
  sound: boolean;
  currentLang: GameSavannahLangs;
}
