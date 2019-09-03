import { TestBed, inject } from '@angular/core/testing';

import { ClaimedService } from './claimed.service';

describe('ClaimedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClaimedService]
    });
  });

  it('should be created', inject([ClaimedService], (service: ClaimedService) => {
    expect(service).toBeTruthy();
  }));
});
