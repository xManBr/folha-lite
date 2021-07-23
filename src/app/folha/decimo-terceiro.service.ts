import { CrudService } from '../shared/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ConfigApp } from '../shared/config-app';
import { ErrorMsgInterface } from '../interface/error-msg.interface';
import { Util } from '../shared/util';
import { DecimoTerceiroInterface } from '../interface/decimo-terceiro.interface';

@Injectable({
  providedIn: 'root'
})
export class DecimoTerceiroService extends CrudService<DecimoTerceiroInterface> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}`);

  }

  ajuste(model: DecimoTerceiroInterface) {
    model.tipoSalario = model.ehSalarioPorHora ?
      ConfigApp.TIPO_SALARIO_HORISTA : ConfigApp.TIPO_SALARIO_MENSALISTA;
    //
    model.jornada = model.jornada != null ? +model.jornada : 0;
    model.percenPensao = model.percenPensao != null ? +model.percenPensao : 0;
    model.dependentesIR = model.dependentesIR != null ? +model.dependentesIR : 0;
    model.ano = model.ano != null ? +model.ano : 0;
    model.mediaSalarioVariavel = model.mediaSalarioVariavel != null ? +model.mediaSalarioVariavel : 0; 
  }

  validator(model: DecimoTerceiroInterface): Array<ErrorMsgInterface> {

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

    if (+model.dataAdmissao.substr(0,4) > + model.ano)
    {
      var error = <ErrorMsgInterface>{};
      error.target = 'ano';
      error.message = 'Ano do calculo não pode ser MENOR que o ano da Admissão.';
      errorList.push(error);
    }
    return errorList;
  }
}

