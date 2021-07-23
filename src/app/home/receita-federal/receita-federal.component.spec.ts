import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaFederalComponent } from './receita-federal.component';

describe('ReceitaFederalComponent', () => {
  let component: ReceitaFederalComponent;
  let fixture: ComponentFixture<ReceitaFederalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceitaFederalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaFederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
