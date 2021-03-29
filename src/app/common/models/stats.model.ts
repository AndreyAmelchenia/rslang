export interface Stats {
  totalLearned: number;
  totalRightPercent: number;
  longestSeries: {
    savanna: number;
    sprint: number;
    audio: number;
    myGame: number;
  };
  dailyStatus: {
    learned: number;
    rightPercent: number;
  };
}
