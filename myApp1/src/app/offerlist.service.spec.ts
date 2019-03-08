import { TestBed } from '@angular/core/testing';

import { OfferlistService } from './offerlist.service';

describe('OfferlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfferlistService = TestBed.get(OfferlistService);
    expect(service).toBeTruthy();
  });
});
