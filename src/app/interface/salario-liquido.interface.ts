export interface SalarioLiquidoInterface {
    cpf: string;
    competencia: string;
    tipoSalario: string;
    salarioBase: number;
    jornada: number;
    dependentesIR: number;
    dependentesFamilia: number;
    horasExtrasQtde: number;
    horasExtrasPerc: number;
    faltasAtrasos: number;
    comissao: number;
    horasOuDias: number;
    percenPensao: number;
    ehSalarioPorHora: boolean;
    
}
