import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearHorarioPage } from './crear-horario';

@NgModule({
  declarations: [
    CrearHorarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearHorarioPage),
  ],
})
export class CrearHorarioPageModule {}
