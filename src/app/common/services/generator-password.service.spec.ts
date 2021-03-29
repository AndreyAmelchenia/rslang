import { TestBed } from '@angular/core/testing';

import { GeneratorPasswordService } from './generator-password.service';

describe('GeneratorPasswordService', () => {
  let service: GeneratorPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
