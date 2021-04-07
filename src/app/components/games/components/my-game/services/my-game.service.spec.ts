import { TestBed } from '@angular/core/testing';

import { MyGameService } from './my-game.service';

describe('MyGameService', () => {
  let service: MyGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
