export interface ISettings {
  wordsPerDay: number;
  optional: {
    displayTranslation: boolean;
    displayHandlingButtons: boolean;
  };
  id?: number;
}
