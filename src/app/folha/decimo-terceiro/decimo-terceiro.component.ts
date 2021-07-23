import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.directive';
import { DecimoTerceiroService } from '../decimo-terceiro.service';
import { DecimoTerceiroInterface } from 'src/app/interface/decimo-terceiro.interface';
import { BannerService } from 'src/app/shared/banner.service';
import { DynamicScriptLoaderService } from 'src/app/shared/dynamic-script-loader.service';

@Component({
  selector: 'app-decimo-terceiro',
  templateUrl: './decimo-terceiro.component.html',
  styleUrls: ['./decimo-terceiro.component.css']
})
export class DecimoTerceiroComponent extends BaseFormComponent implements OnInit {

  myForm: FormGroup;
  submited: boolean = false;

  constructor(private loadScriptService: DynamicScriptLoaderService, private bannerService: BannerService, private modal: AlertModalService, private formBuild: FormBuilder,
    private service: DecimoTerceiroService, private location: Location, private router: Router) {
    super();

  }

  ngOnInit(): void {
    this.myForm = this.formBuild.group({
      dataAdmissao: [null, [Validators.required, Validators.maxLength(10)]],
      //numero 
      ano: [null, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      dependentesIR: [null, [Validators.maxLength(2), Validators.max(99)]],
      parcela: [null, [Validators.required, Validators.min(1), Validators.max(2)]],
      jornada: [44, [Validators.required, Validators.maxLength(2)]],
      //Percentual
      percenPensao: [null, [Validators.maxLength(2), Validators.min(0), Validators.max(99)]],
      //Moeda 
      salarioBase: [null, [Validators.required, Validators.maxLength(14)]],
      mediaSalarioVariavel: [null, [Validators.maxLength(14)]],
      //boolean
      ehSalarioPorHora: [false],
      aceitaTermos: [false, Validators.required]
    });
  }

  submit() {
    this.submited = true;
    let decimoterceiroType: DecimoTerceiroInterface = this.myForm.value;
    this.service.ajuste(decimoterceiroType);
    let errorMgs = this.service.validator(decimoterceiroType);
    if (errorMgs.length == 0) {
      let msgError = 'Erro ao calcular, modifique as informações e tente novamente!';
      this.service.calcularDecimoTerceiro(decimoterceiroType).subscribe(
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