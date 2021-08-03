import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { BaseFormDirective } from 'src/app/shared/base-form/base-form.directive';
import { FeriasInterface } from 'src/app/interface/ferias.interface';
import { FeriasService } from '../ferias.service';
import { FormValidations } from 'src/app/shared/formvalidations';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent extends BaseFormDirective implements OnInit {

  myForm: FormGroup;
  submited = false;

  constructor(
    private modal: AlertModalService,
    private formBuild: FormBuilder,
    private service: FeriasService,
    private location: Location,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.myForm = this.formBuild.group({
      dataFerias: [null, [Validators.required, Validators.maxLength(10)]],
      dependentesIR: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      diasFerias: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(30)]],
      diasAbono: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(30), FormValidations.diasFeriasDiasAbonoEntre1e30('diasFerias')]],
      jornada: [44, [Validators.required, Validators.maxLength(2)]],
      percenPensao: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      salarioBase: [null, [Validators.required, Validators.maxLength(14)]],
      mediaSalarioVariavel: [null, [Validators.maxLength(14)]],
      ehSalarioPorHora: [false],
      aceitaTermos: [false, Validators.required],
      ehFeriasEmDobro: [false],
      ehCom13Salario: [false]
    });
  }

  submit(): void {
    this.submited = true;
    const feriasType: FeriasInterface = this.myForm.value;
    this.service.ajuste(feriasType);
    const errorMgs = this.service.validator(feriasType);
    if (errorMgs.length === 0) {
      const msgError = 'Erro ao calcular, modifique as informações e tente novamente!';
      this.service.calcularFerias(feriasType).subscribe(
        recibo => {
          this.router.navigateByUrl('/result', {
            state: { recibo }
          });
        }
        , error => {
          this.submited = false;
          this.modal.showAlertDanger(msgError);
        }
      );
    }
    else {
      let myMsg = '';
      errorMgs.forEach(errorMg => {
        myMsg = myMsg !== '' ? myMsg + ' ' + errorMg.message : errorMg.message;
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
