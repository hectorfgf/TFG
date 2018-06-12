import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoHorariosPage } from './listado-horarios';
import {NgCalendarModule} from "ionic2-calendar";


@NgModule({
  declarations: [
    ListadoHorariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoHorariosPage),
    NgCalendarModule
  ],
})
export class ListadoHorariosPageModule {}
