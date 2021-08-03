import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RescisaoService } from '../rescisao.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { FormValidations } from 'src/app/shared/formvalidations';
import { Router } from '@angular/router';
import { BaseFormDirective } from 'src/app/shared/base-form/base-form.directive';
import { RescisaoInterface } from 'src/app/interface/rescisao.interface';

@Component({
  selector: 'app-rescisao',
  templateUrl: './rescisao.component.html',
  styleUrls: ['./rescisao.component.css']
})

export class RescisaoComponent extends BaseFormDirective implements OnInit {

  myForm: FormGroup;
  submited = false;

  constructor(private modal: AlertModalService, private formBuild: FormBuilder,
              private service: RescisaoService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.myForm = this.formBuild.group({
      // Data
      dataAdmissao: [null, [Validators.required, Validators.maxLength(10)]],
      dataDemissao: [null, [Validators.required, Validators.maxLength(10), FormValidations.demissaoMenorQueAdmissao('dataAdmissao')]],

      // Indicador
      motivo: [null, [Validators.required, Validators.maxLength(2)]],
      tipoAviso: [null, [Validators.required, Validators.maxLength(2)]],

      // numero
      dependentesIR: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      dependentesFamilia: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],

      // Horas ou Dias
      jornada: [44, [Validators.required, Validators.maxLength(2)]],
      horasOuDias: [null, [Validators.maxLength(3), Validators.min(0), Validators.max(220)]],
      faltasAtrasos: [null, [Validators.maxLength(3), Validators.min(0), Validators.max(220)]],
      horasExtrasQtde: [null, [Validators.maxLength(3), Validators.min(0), Validators.max(220)]],

      // Percentual
      percenPensao: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      horasExtrasPerc: [null, [Validators.maxLength(3), Validators.min(0)]],

      // Moeda
      salarioBase: [null, [Validators.required, Validators.maxLength(14)]],
      saldoDepFGTS: [null, [Validators.maxLength(14)]],
      comissao: [null, [Validators.maxLength(14)]],

      // boolean
      rescisaoAntecipada: [false],
      ehSalarioPorHora: [false],
      feriasJaRecebidas: [false],
      aceitaTermos: [false, Validators.required]
    }
    );
  }

  submit(): void {
    this.submited = true;
    const rescisaoType: RescisaoInterface = this.myForm.value;
    this.service.rescisaoAjuste(rescisaoType);
    const errorMgs = this.service.rescisaoBLLValidator(rescisaoType);
    if (errorMgs.length === 0) {
      const msgError = 'Erro ao calcular, modifique as informações e tente novamente!';
      this.service.calcularRescisao(rescisaoType).subscribe(
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
