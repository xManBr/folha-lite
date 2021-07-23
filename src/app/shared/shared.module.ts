import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [ErrorMsgComponent, AlertModalComponent, BannerComponent],
  imports: [
    CommonModule
  ],
  exports: [ErrorMsgComponent, AlertModalComponent, BannerComponent]

})
export class SharedModule { }
