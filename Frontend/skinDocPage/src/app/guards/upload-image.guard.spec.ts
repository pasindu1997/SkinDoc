import { TestBed, async, inject } from '@angular/core/testing';

import { UploadImageGuard } from './upload-image.guard';

describe('UploadImageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadImageGuard]
    });
  });

  it('should ...', inject([UploadImageGuard], (guard: UploadImageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
