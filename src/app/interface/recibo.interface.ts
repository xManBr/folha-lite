import { ReciboItemInterface } from "./recibo-item.interface";

export interface ReciboInterface {
    tipoDeCalculo: number;
    nomeDeCalculo: string;
    competencia: string;
    cesconto: number;
    baseFgts: number;
    baseInss: number;
    baseIrrf: number;
    fgts: number;
    liquido: number;
    rendimento: number;
    fgtsRescisao: number;
    fgts40Rescisao: number;
    fgts40Deposito: number;
    reciboItemTOs: ReciboItemInterface[];
}
