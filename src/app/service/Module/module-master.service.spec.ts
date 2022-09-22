import { TestBed } from '@angular/core/testing';

import { ModuleMasterService } from './module-master.service';

describe('ModuleMasterService', () => {
  let service: ModuleMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
