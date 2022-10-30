import { TestBed } from '@angular/core/testing';

import { MedalListService } from './medal-list.service';

describe('MedalListService', () => {
  let service: MedalListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedalListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
