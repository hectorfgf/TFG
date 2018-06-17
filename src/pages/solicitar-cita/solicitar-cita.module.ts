import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitarCitaPage } from './solicitar-cita';
import {NgCalendarModule} from "ionic2-calendar";

@NgModule({
  declarations: [
    SolicitarCitaPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitarCitaPage),
    NgCalendarModule
  ],
})
export class SolicitarCitaPageModule {}
