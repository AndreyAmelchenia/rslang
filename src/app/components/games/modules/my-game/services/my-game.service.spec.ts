import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MyGameService } from './my-game.service';

describe('MyGameService', () => {
  let service: MyGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MyGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
