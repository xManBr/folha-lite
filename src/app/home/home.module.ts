import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitaFederalComponent } from './receita-federal/receita-federal.component';
import { SuportComponent } from './suport/suport.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdsenseModule } from 'ng2-adsense';



@NgModule({
  declarations: [ReceitaFederalComponent, SuportComponent, PrivacyComponent, ContactComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-1847611814626404',
      adSlot: 6069916587,
      display: 'block',
      adFormat: 'auto',
      fullWidthResponsive: true,
    }),
  ]
})
export class HomeModule { }
