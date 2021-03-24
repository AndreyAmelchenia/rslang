import { Action } from '@ngrx/store';

export const START_NEW_GAME = 'Start New Game';

export class StartNewGame implements Action {
  type: string = START_NEW_GAME;

  constructor(payload: any) {
    console.log(`ACTION ${START_NEW_GAME}`, this.type, payload);
  }
}

export type AudioChallengeGameActions = StartNewGame;
