import { TestBed } from '@angular/core/testing';

import { ProblemIntroService } from './problem-intro.service';

describe('ProblemIntroServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProblemIntroService = TestBed.get(ProblemIntroService);
    expect(service).toBeTruthy();
  });
});
