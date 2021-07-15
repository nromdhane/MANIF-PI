import { TestBed, inject } from '@angular/core/testing';

import { NutritionnisteService } from './nutritionniste.service';

describe('NutritionnisteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NutritionnisteService]
    });
  });

  it('should be created', inject([NutritionnisteService], (service: NutritionnisteService) => {
    expect(service).toBeTruthy();
  }));
});
