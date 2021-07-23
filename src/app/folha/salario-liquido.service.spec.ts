import { TestBed } from '@angular/core/testing';

import { SalarioLiquidoService } from './salario-liquido.service';

describe('SalarioLiquidoService', () => {
  let service: SalarioLiquidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalarioLiquidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
