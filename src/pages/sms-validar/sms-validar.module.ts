import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SmsValidarPage } from './sms-validar';

@NgModule({
  declarations: [
    SmsValidarPage,
  ],
  imports: [
    IonicPageModule.forChild(SmsValidarPage),
  ],
})
export class SmsValidarPageModule {}
