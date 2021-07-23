import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RescisaoComponent } from './folha/rescisao/rescisao.component';
import { SalarioLiquidoComponent } from './folha/salario-liquido/salario-liquido.component';
import { FeriasComponent } from './folha/ferias/ferias.component';
import { DecimoTerceiroComponent } from './folha/decimo-terceiro/decimo-terceiro.component';
import { ReceitaFederalComponent } from './home/receita-federal/receita-federal.component';
import { SuportComponent } from './home/suport/suport.component';
import { ContactComponent } from './home/contact/contact.component';
import { PrivacyComponent } from './home/privacy/privacy.component';
import { ResultComponent } from './folha/result/result.component';

const routes: Routes = [
  { path: 'decimo-terceiro', component: DecimoTerceiroComponent },
  { path: 'rescisao', component: RescisaoComponent },
  { path: 'salario-liquido', component: SalarioLiquidoComponent },
  { path: 'ferias', component: FeriasComponent },
  { path: 'result', component: ResultComponent },  
  { path: 'receita-federal', component: ReceitaFederalComponent },
  { path: 'suport', component: SuportComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '', pathMatch: 'full', redirectTo: 'receita-federal' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
