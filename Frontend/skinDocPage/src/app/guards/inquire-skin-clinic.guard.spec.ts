import { TestBed, async, inject } from '@angular/core/testing';

import { InquireSkinClinicGuard } from './inquire-skin-clinic.guard';

describe('InquireSkinClinicGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InquireSkinClinicGuard]
    });
  });

  it('should ...', inject([InquireSkinClinicGuard], (guard: InquireSkinClinicGuard) => {
    expect(guard).toBeTruthy();
  }));
});
