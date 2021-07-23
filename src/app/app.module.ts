import { LOCALE_ID, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FolhaModule } from './folha/folha.module';
import { NgxCurrencyModule, CurrencyMaskInputMode } from "ngx-currency";
import { HomeModule } from './home/home.module';
import { AdsenseModule } from 'ng2-adsense';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { TranslateModule } from '@ngx-translate/core';


//Documentação do CookieConsent
//https://www.osano.com/cookieconsent/documentation/javascript-api/
const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'https://contador.com.br' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out',
  position : 'bottom-right'
};

registerLocaleData(localeBr);

export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
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
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    FolhaModule,
    HttpClientModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    BrowserAnimationsModule,
    HomeModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-1847611814626404',
      adSlot: 6069916587,
      display: 'block',
      adFormat: 'auto',
      fullWidthResponsive: true,
    }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    TranslateModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

//https://angular.io/api/common/LocationStrategy
//{ provide: LocationStrategy, useClass: HashLocationStrategy }
