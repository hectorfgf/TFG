import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleAutorizacionPage } from './detalle-autorizacion';

@NgModule({
  declarations: [
    DetalleAutorizacionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleAutorizacionPage),
  ],
})
export class DetalleAutorizacionPageModule {}
