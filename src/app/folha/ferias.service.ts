import { CrudService } from '../shared/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventEmitter, Injectable } from '@angular/core';
import { ConfigApp } from '../shared/config-app';
import { ErrorMsgInterface } from '../interface/error-msg.interface';
import { Util } from '../shared/util';
import { FeriasInterface } from "src/app/interface/ferias.interface";

@Injectable({
  providedIn: 'root'
})
export class FeriasService extends CrudService<FeriasInterface> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}`);

  }

  ajuste(model: FeriasInterface) {
    model.tipoSalario = model.ehSalarioPorHora ?
      ConfigApp.TIPO_SALARIO_HORISTA : ConfigApp.TIPO_SALARIO_MENSALISTA;
    //
    model.jornada = model.jornada != null ? +model.jornada : 0;
    model.percenPensao = model.percenPensao != null ? +model.percenPensao : 0;
    model.dependentesIR = model.dependentesIR != null ? +model.dependentesIR : 0;
    model.diasAbono = model.diasAbono != null ? +model.diasAbono : 0;
    model.diasFerias = model.diasFerias != null ? +model.diasFerias : 0;
    model.mediaSalarioVariavel = model.mediaSalarioVariavel != null ? +model.mediaSalarioVariavel : 0; 
  }

  validator(model: FeriasInterface): Array<ErrorMsgInterface> {

    var errorList: ErrorMsgInterface[] = new Array();

    if (+model.salarioBase == 0) {
      var error = <ErrorMsgInterface>{};
      error.target = 'salarioBase';
      error.message = 'Salário Base é Necessario.';
      errorList.push(error);
    }
    else {
      if (!Util.isDecimalOrInteger(model.salarioBase)) {
        var error = <ErrorMsgInterface>{};
        error.target = 'salarioBase';
        error.message = 'Salário Base Inválido.';
        errorList.push(error);
      }
    }

    if (model.jornada == 0) {
      var error = <ErrorMsgInterface>{};
      error.target = 'jornada';
      error.message = 'Jornada é Necessário.';
      errorList.push(error);
    }

    if (!Util.isDecimalOrInteger(model.diasFerias)) {
      var error = <ErrorMsgInterface>{};
      error.target = 'diasFerias';
      error.message = 'Informe um número para dias de férias.';
      errorList.push(error);
    } else if (!Util.isDecimalOrInteger(model.diasAbono)) {
      var error = <ErrorMsgInterface>{};
      error.target = 'diasAbono';
      error.message = 'Informe um número para dias de abono.';
      errorList.push(error);
    } else if ((model.diasFerias + model.diasAbono) < 1 || (model.diasFerias + model.diasAbono) > 30) {
      var error = <ErrorMsgInterface>{};
      error.target = 'diasFeriasDiasAbono';
      error.message = 'A soma de dias de ferias e abono deve estar entre 1 e 30 dias.';
      errorList.push(error);
    }
    return errorList;
  }
}
