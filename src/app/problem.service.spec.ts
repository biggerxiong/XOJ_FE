import { TestBed } from '@angular/core/testing';

import { ProblemService } from './problem.service';

describe('ProblemIntroServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProblemService = TestBed.get(ProblemService);
    expect(service).toBeTruthy();
  });
});
