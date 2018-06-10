import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoHorariosPage } from './listado-horarios';

@NgModule({
  declarations: [
    ListadoHorariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoHorariosPage),
  ],
})
export class ListadoHorariosPageModule {}
