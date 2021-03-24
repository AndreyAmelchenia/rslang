import { START_NEW_GAME } from './audio-challenge-game.actions';
import * as programActions from './audio-challenge-game.actions';

export function reducer(state: any, action: programActions.AudioChallengeGameActions): any {
  switch (action.type) {
    case START_NEW_GAME: {
      console.log(`REDUCER ${START_NEW_GAME}`);
      return {
        isGameStarted: false,
        wordsRemaining: 9,
        color: 'yellow',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
