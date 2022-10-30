import { TestBed } from '@angular/core/testing';

import { ListRulesService } from './list-rules.service';

describe('ListRulesService', () => {
  let service: ListRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
