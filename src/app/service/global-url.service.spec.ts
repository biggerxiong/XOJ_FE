import { TestBed } from '@angular/core/testing';

import { GlobalUrlService } from './global-url.service';

describe('GlobalUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalUrlService = TestBed.get(GlobalUrlService);
    expect(service).toBeTruthy();
  });
});
