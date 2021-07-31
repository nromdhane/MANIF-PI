import { TestBed, inject } from '@angular/core/testing';

import { SpecialiteService } from './specialite.service';

describe('SpecialiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialiteService]
    });
  });

  it('should be created', inject([SpecialiteService], (service: SpecialiteService) => {
    expect(service).toBeTruthy();
  }));
});
