import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.directive';
import { FeriasInterface } from "src/app/interface/ferias.interface";
import { FeriasService } from '../ferias.service';
import { FormValidations } from 'src/app/shared/formvalidations';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent extends BaseFormComponent implements OnInit {

  myForm: FormGroup;
  submited: boolean = false;

  constructor(private modal: AlertModalService, private formBuild: FormBuilder,
    private service: FeriasService, private location: Location, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.myForm = this.formBuild.group({
      dataFerias: [null, [Validators.required, Validators.maxLength(10)]],
      //numero   
      dependentesIR: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      diasFerias: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(30)]],
      diasAbono: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(30), FormValidations.diasFeriasDiasAbonoEntre1e30('diasFerias')]],
      //Horas ou Dias
      jornada: [44, [Validators.required, Validators.maxLength(2)]],
      //Percentual
      percenPensao: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      //Moeda 
      salarioBase: [null, [Validators.required, Validators.maxLength(14)]],
      mediaSalarioVariavel: [null, [Validators.maxLength(14)]],
      //boolean
      ehSalarioPorHora: [false],
      aceitaTermos: [false, Validators.required],
      ehFeriasEmDobro: [false],
      ehCom13Salario: [false]

    });
  }

  submit() {
    this.submited = true;
    let feriasType: FeriasInterface = this.myForm.value;
    this.service.ajuste(feriasType);
    let errorMgs = this.service.validator(feriasType);
    if (errorMgs.length == 0) {
      let msgError = 'Erro ao calcular, modifique as informações e tente novamente!';
      this.service.calcularFerias(feriasType).subscribe(
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