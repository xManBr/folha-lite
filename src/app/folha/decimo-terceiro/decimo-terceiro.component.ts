import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { BaseFormDirective } from 'src/app/shared/base-form/base-form.directive';
import { DecimoTerceiroService } from '../decimo-terceiro.service';
import { DecimoTerceiroInterface } from 'src/app/interface/decimo-terceiro.interface';

@Component({
  selector: 'app-decimo-terceiro',
  templateUrl: './decimo-terceiro.component.html',
  styleUrls: ['./decimo-terceiro.component.css']
})
export class DecimoTerceiroComponent extends BaseFormDirective implements OnInit {
  myForm: FormGroup;
  submited = false;

  constructor(
    private modal: AlertModalService,
    private formBuild: FormBuilder,
    private service: DecimoTerceiroService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.myForm = this.formBuild.group({
      dataAdmissao: [null, [Validators.required, Validators.maxLength(10)]],
      ano: [null, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      dependentesIR: [null, [Validators.maxLength(2), Validators.max(99)]],
      parcela: [null, [Validators.required, Validators.min(1), Validators.max(2)]],
      jornada: [44, [Validators.required, Validators.maxLength(2)]],
      percenPensao: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      salarioBase: [null, [Validators.required, Validators.maxLength(14)]],
      mediaSalarioVariavel: [null, [Validators.maxLength(14)]],
      ehSalarioPorHora: [false],
      aceitaTermos: [false, Validators.required]
    });
  }

  submit(): void {
    this.submited = true;
    const decimoterceiroType: DecimoTerceiroInterface = this.myForm.value;
    this.service.ajuste(decimoterceiroType);
    const errorMgs = this.service.validator(decimoterceiroType);
    if (errorMgs.length === 0) {
      const msgError = 'Erro ao calcular, modifique as informações e tente novamente!';
      this.service.calcularDecimoTerceiro(decimoterceiroType).subscribe(
        recibo => {
          this.router.navigateByUrl('/result', {
            state: { recibo }
          });
        }
        , () => {
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
