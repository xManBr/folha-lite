import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "./../shared/shared.module";
import { NgxCurrencyModule, CurrencyMaskInputMode } from "ngx-currency";
import { RescisaoComponent } from './rescisao/rescisao.component';
import { SalarioLiquidoComponent } from './salario-liquido/salario-liquido.component';
import { FeriasComponent } from './ferias/ferias.component';
import { DecimoTerceiroComponent } from './decimo-terceiro/decimo-terceiro.component';
import { ResultComponent } from './result/result.component';
import { AdsenseModule } from 'ng2-adsense';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [RescisaoComponent,
    SalarioLiquidoComponent,
    FeriasComponent,
    DecimoTerceiroComponent,
    ResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-1847611814626404',
      adSlot: 6069916587,
      display: 'block',
      adFormat: 'auto',
      fullWidthResponsive: true,
    }),
  ],
  exports: [RescisaoComponent]
})
export class FolhaModule { }
