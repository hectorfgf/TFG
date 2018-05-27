import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoHijosPage } from './listado-hijos';

@NgModule({
  declarations: [
    ListadoHijosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoHijosPage),
  ],
})
export class ListadoHijosPageModule {}
