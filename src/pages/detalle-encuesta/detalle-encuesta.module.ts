import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleEncuestaPage } from './detalle-encuesta';

@NgModule({
  declarations: [
    DetalleEncuestaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleEncuestaPage),
  ],
})
export class DetalleEncuestaPageModule {}
