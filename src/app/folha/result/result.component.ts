import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReciboItemInterface } from 'src/app/interface/recibo-item.interface';
import { ReciboInterface } from 'src/app/interface/recibo.interface';
import { environment } from 'src/environments/environment';
import { formatCurrency } from '@angular/common';
import { ConfigApp } from 'src/app/shared/config-app';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  competencia: string;
  liquido: number;
  fgts: number;
  baseInss: number;
  baseIrrf: number;
  recibo: ReciboInterface;
  subtitulo: string = 'Resultado';
  tipoDeCalculo: string;
  ehRescisao: boolean;
  ehDecimoTerceiro: boolean;
  ehSalarioLiquido: boolean;

  fgtsRescisao: number;
  fgts40Rescisao: number;
  fgts40Deposito: number;
  liquidoComFGTS: number;


  public reciboItemTOs: ReciboItemInterface[];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav) {
      this.recibo = nav.extras.state.recibo;
      this.recibo.reciboItemTOs = this.recibo.reciboItemTOs.filter(x => ((x.renDes == 'A-Rend') || (x.renDes == 'B-Desc')));
      this.recibo.reciboItemTOs = this.recibo.reciboItemTOs.sort((n1, n2) => {
        if (n1.renDes > n2.renDes) {
          return 1;
        }

        if (n1.renDes < n2.renDes) {
          return -1;
        }

        return 0;
      });
      this.competencia = this.recibo.competencia;
      this.liquido = +this.recibo.liquido;
      this.fgts = +this.recibo.fgts;
      this.baseInss = +this.recibo.baseInss;
      this.baseIrrf = +this.recibo.baseIrrf;
      this.fgtsRescisao= +this.recibo.fgtsRescisao;
      this.fgts40Rescisao= +this.recibo.fgts40Rescisao;
      this.fgts40Deposito= +this.recibo.fgts40Deposito;
      this.liquidoComFGTS =  this.liquido + this.fgtsRescisao + this.fgts40Rescisao + this.fgts40Deposito;

      this.ehRescisao = +this.recibo.tipoDeCalculo == ConfigApp.TIPO_DE_CALCULO_RESCISAO;
      this.ehDecimoTerceiro = +this.recibo.tipoDeCalculo == ConfigApp.TIPO_DE_CALCULO_DECIMO_TERCEIRO;
      this.ehSalarioLiquido = +this.recibo.tipoDeCalculo == ConfigApp.TIPO_DE_CALCULO_FOLHA;
      switch (this.recibo.tipoDeCalculo) {
        case ConfigApp.TIPO_DE_CALCULO_RESCISAO: {
          this.subtitulo = "Rescisão";
          break;
        }
        case ConfigApp.TIPO_DE_CALCULO_FOLHA: {
          this.subtitulo = "Salário Líquido";
          break;
        }
        case ConfigApp.TIPO_DE_CALCULO_FERIAS: {
          this.subtitulo = "FÉRIAS";
          break;
        }
        case ConfigApp.TIPO_DE_CALCULO_DECIMO_TERCEIRO: {
          this.subtitulo = "13° Salário";
          break;
        }
        default: {
          break;
        }
      }
      this.subtitulo = this.subtitulo + ": " + this.competencia;
    }
  }

  ngOnInit(): void {
  }

  moeda(valor: number) {
    return formatCurrency(valor, environment.API, "R$", null, ',');
  }

}
