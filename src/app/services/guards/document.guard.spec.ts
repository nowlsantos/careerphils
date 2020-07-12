import { TestBed } from '@angular/core/testing';

import { DocumentGuard } from './document.guard';

describe('DocumentGuard', () => {
  let guard: DocumentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DocumentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
