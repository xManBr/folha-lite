import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalarioLiquidoService } from '../salario-liquido.service';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.directive';
import { SalarioLiquidoInterface } from "src/app/interface/salario-liquido.interface";

@Component({
  selector: 'app-salario-liquido',
  templateUrl: './salario-liquido.component.html',
  styleUrls: ['./salario-liquido.component.css']
})

export class SalarioLiquidoComponent extends BaseFormComponent implements OnInit {

  myForm: FormGroup;
  submited: boolean = false;

  constructor(private modal: AlertModalService, private formBuild: FormBuilder,
    private service: SalarioLiquidoService, private location: Location, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.myForm = this.formBuild.group({
      competencia: [null, [Validators.required, Validators.maxLength(10)]],
      //numero   
      dependentesIR: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      dependentesFamilia: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],

      //Horas ou Dias
      jornada: [44, [Validators.required, Validators.maxLength(2)]],
      horasOuDias: [null, [Validators.maxLength(3), Validators.min(0), Validators.max(220)]],
      faltasAtrasos: [null, [Validators.maxLength(3), Validators.min(0), Validators.max(220)]],
      horasExtrasQtde: [null, [Validators.maxLength(3), Validators.min(0), Validators.max(220)]],

      //Percentual
      percenPensao: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      horasExtrasPerc: [null, [Validators.maxLength(3), Validators.min(0)]],

      //Moeda 
      salarioBase: [null, [Validators.required, Validators.maxLength(14)]],
      comissao: [ null, [Validators.maxLength(14)]],

      //boolean
      ehSalarioPorHora: [false],
      aceitaTermos: [false, Validators.required]

    }
    );
  }

  submit() {
    this.submited = true;
    let salarioLiquidoType: SalarioLiquidoInterface = this.myForm.value;
    this.service.salarioLiquidoAjuste(salarioLiquidoType);
    let errorMgs = this.service.salarioLiquidoBLLValidator(salarioLiquidoType);
    if (errorMgs.length == 0) {
      let msgError = 'Erro ao calcular, modifique as informações e tente novamente!';
      this.service.calcularSalarioLiquido(salarioLiquidoType).subscribe(
        recibo => {
          this.router.navigateByUrl("/result", {
            state: { recibo: recibo }
          });
        }
        , error => {
          this.submited = false;
          this.modal.showAlertDanger(msgError);
        }
      );
    }
    else {
      var myMsg: string = '';
      errorMgs.forEach(errorMgs => {
        myMsg = myMsg != '' ? myMsg + ' ' + errorMgs.message : errorMgs.message;
      });
      this.submited = false;
      this.modal.showAlertDanger(myMsg);
    }
  }

  resertForm(): void {

    this.submited = false;
    this.myForm.reset();
  }

}
