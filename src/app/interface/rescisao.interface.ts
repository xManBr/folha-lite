export interface RescisaoInterface {
    cpf: string;
    dataAdmissao: string;
    dataDemissao: string;
    tipoAviso: string;
    motivo: string;
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
    saldoDepFGTS: number;
    ehSalarioPorHora: boolean;
    rescisaoAntecipada: boolean;
    feriasJaRecebidas: boolean;
}
