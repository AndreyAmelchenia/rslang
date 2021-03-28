import { Word } from './word.model';

export interface AggregatedWords {
  paginatedResults: Word[];
  totalCount: [{ count: number }];
}
