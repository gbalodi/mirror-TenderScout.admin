import { TestBed, inject } from '@angular/core/testing';

import { InjestorsService } from './injestors.service';

describe('InjestorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InjestorsService]
    });
  });

  it('should be created', inject([InjestorsService], (service: InjestorsService) => {
    expect(service).toBeTruthy();
  }));
});
