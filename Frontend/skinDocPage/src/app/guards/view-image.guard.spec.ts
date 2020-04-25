import { TestBed, async, inject } from '@angular/core/testing';

import { ViewImageGuard } from './view-image.guard';

describe('ViewImageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewImageGuard]
    });
  });

  it('should ...', inject([ViewImageGuard], (guard: ViewImageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
