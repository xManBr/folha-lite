import { TestBed } from '@angular/core/testing';

import { RescisaoService } from './rescisao.service';

describe('RescisaoService', () => {
  let service: RescisaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RescisaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
