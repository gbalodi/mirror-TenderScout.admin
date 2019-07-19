import { TestBed, inject } from '@angular/core/testing';

import { DocumentsListService } from './documents-list.service';

describe('DocumentsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentsListService]
    });
  });

  it('should be created', inject([DocumentsListService], (service: DocumentsListService) => {
    expect(service).toBeTruthy();
  }));
});
