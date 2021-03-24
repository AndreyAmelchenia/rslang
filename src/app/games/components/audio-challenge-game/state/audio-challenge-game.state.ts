export interface State {
  isGameStarted: boolean;
  wordsRemaining: number;
  color: string;
}

// eslint-disable-next-line prettier/prettier
export const initialState: State = {} as State;
