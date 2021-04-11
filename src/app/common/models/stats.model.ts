export interface IResponse {
  learnedWords: number;
  optional: {
    data: string;
  };
}

export interface IStats {
  shortTerm: IDailyStats;
  longTerm: Array<IDay>;
}

export interface IDay {
  date: number;
  learned: number;
}

export interface IDailyStats {
  date: number;
  savanna: IGame;
  sprint: IGame;
  audio: IGame;
  myGame: IGame;
}

export interface IGame {
  learned: number;
  tries: number;
  right: number;
  series: number;
}
