import { TestBed } from '@angular/core/testing';

import { JudgeStatusService } from './judge-status.service';

describe('JudgeStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JudgeStatusService = TestBed.get(JudgeStatusService);
    expect(service).toBeTruthy();
  });
});
