import { CrudService } from '../shared/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ConfigApp } from '../shared/config-app';
import { ErrorMsgInterface } from '../interface/error-msg.interface';
import { Util } from '../shared/util';
import { SalarioLiquidoInterface } from '../interface/salario-liquido.interface';

@Injectable({
    providedIn: 'root'
})
export class SalarioLiquidoService extends CrudService<SalarioLiquidoInterface> {

    constructor(protected http: HttpClient) {
        super(http, `${environment.API}`);

    }

    //Salário Líquido
    salarioLiquidoAjuste(salarioLiquidoType: SalarioLiquidoInterface) {
        salarioLiquidoType.tipoSalario = salarioLiquidoType.ehSalarioPorHora ?
            ConfigApp.TIPO_SALARIO_HORISTA : ConfigApp.TIPO_SALARIO_MENSALISTA;
        //
        salarioLiquidoType.comissao = salarioLiquidoType.comissao != null ? salarioLiquidoType.comissao : 0;
        salarioLiquidoType.horasExtrasPerc = salarioLiquidoType.horasExtrasPerc != null ? +salarioLiquidoType.horasExtrasPerc : 0;
        salarioLiquidoType.horasExtrasQtde = salarioLiquidoType.horasExtrasQtde != null ? +salarioLiquidoType.horasExtrasQtde : 0;
        salarioLiquidoType.jornada = salarioLiquidoType.jornada != null ? +salarioLiquidoType.jornada : 0;
        salarioLiquidoType.percenPensao = salarioLiquidoType.percenPensao != null ? +salarioLiquidoType.percenPensao : 0;
        salarioLiquidoType.horasOuDias = salarioLiquidoType.horasOuDias != null ? +salarioLiquidoType.horasOuDias : 0;
        salarioLiquidoType.dependentesFamilia = salarioLiquidoType.dependentesFamilia != null ? +salarioLiquidoType.dependentesFamilia : 0;
        salarioLiquidoType.dependentesIR = salarioLiquidoType.dependentesIR != null ? +salarioLiquidoType.dependentesIR : 0;
        salarioLiquidoType.faltasAtrasos = salarioLiquidoType.faltasAtrasos != null ? +salarioLiquidoType.faltasAtrasos : 0;
    }

    salarioLiquidoBLLValidator(salarioLiquidoType: SalarioLiquidoInterface): Array<ErrorMsgInterface> {

        var errorList: ErrorMsgInterface[] = new Array();

        if (+salarioLiquidoType.salarioBase == 0) {
            var error = <ErrorMsgInterface>{};
            error.target = 'salarioBase';
            error.message = 'Salário Base é Necessario.';
            errorList.push(error);
        }
        else {
            if (!Util.isDecimalOrInteger(salarioLiquidoType.salarioBase)) {
                var error = <ErrorMsgInterface>{};
                error.target = 'salarioBase';
                error.message = 'Salário Base Inválido.';
                errorList.push(error);
            }
        }

        if (salarioLiquidoType.jornada == 0) {
            var error = <ErrorMsgInterface>{};
            error.target = 'jornada';
            error.message = 'Jornada é Necessário.';
            errorList.push(error);
        }

        if ((salarioLiquidoType.tipoSalario != ConfigApp.TIPO_SALARIO_MENSALISTA) && (!Util.isDecimalOrInteger(salarioLiquidoType.horasOuDias))) {
            var error = <ErrorMsgInterface>{};
            error.target = 'horasOuDias';
            error.message = 'Informe a quantidade de horas ou dias trabalhados no mês.';
            errorList.push(error);
        }
        else {
            if ((salarioLiquidoType.tipoSalario == ConfigApp.TIPO_SALARIO_HORISTA) && (!(salarioLiquidoType.horasOuDias > 0))) {
                var error = <ErrorMsgInterface>{};
                error.target = 'horasOuDias';
                error.message = 'Horas ou dias - requerido para horista.';
                errorList.push(error);
            }
            else {
                if ((salarioLiquidoType.tipoSalario == ConfigApp.TIPO_SALARIO_HORISTA) && (salarioLiquidoType.horasOuDias > 220)) {
                    var error = <ErrorMsgInterface>{};
                    error.target = 'horasOuDias';
                    error.message = 'Informe até 220 horas.';
                    errorList.push(error);
                }
                else {
                    if ((salarioLiquidoType.tipoSalario == ConfigApp.TIPO_SALARIO_DIARISTA) && (salarioLiquidoType.horasOuDias > 31)) {
                        var error = <ErrorMsgInterface>{};
                        error.target = 'horasOuDias';
                        error.message = 'Informe até 31 dias.';
                        errorList.push(error);
                    }
                }
            }
        }
        return errorList;
    }
}
