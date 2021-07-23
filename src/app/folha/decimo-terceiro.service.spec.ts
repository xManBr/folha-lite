import { TestBed } from '@angular/core/testing';

import { DecimoTerceiroService } from './decimo-terceiro.service';

describe('DecimoTerceiroService', () => {
  let service: DecimoTerceiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecimoTerceiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
