import { TestBed } from '@angular/core/testing';

import { InquireSkinClinicService } from './inquire-skin-clinic.service';

describe('InquireSkinClinicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InquireSkinClinicService = TestBed.get(InquireSkinClinicService);
    expect(service).toBeTruthy();
  });
});
