import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoHorariosPage } from './listado-horarios';
import {NgCalendarModule} from "ionic2-calendar";
import {DatePipe} from "@angular/common";


@NgModule({
  declarations: [
    ListadoHorariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoHorariosPage),
    NgCalendarModule
  ],
  providers: [DatePipe]
})
export class ListadoHorariosPageModule {}
