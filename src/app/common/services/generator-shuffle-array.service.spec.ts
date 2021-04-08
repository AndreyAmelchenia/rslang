import { TestBed } from '@angular/core/testing';

import { GeneratorShuffleArrayService } from './generator-shuffle-array.service';

describe('GeneratorShuffleArrayService', () => {
  let service: GeneratorShuffleArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorShuffleArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
