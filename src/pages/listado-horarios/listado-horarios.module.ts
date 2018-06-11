import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoHorariosPage } from './listado-horarios';
import {CalendarModule} from "ion2-calendar";

@NgModule({
  declarations: [
    ListadoHorariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoHorariosPage),
    CalendarModule
  ],
})
export class ListadoHorariosPageModule {}
