import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarioLiquidoComponent } from './salario-liquido.component';

describe('SalarioLiquidoComponent', () => {
  let component: SalarioLiquidoComponent;
  let fixture: ComponentFixture<SalarioLiquidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarioLiquidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarioLiquidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
