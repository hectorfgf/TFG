import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitaDisponiblePage } from './cita-disponible';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CitaDisponiblePage,
  ],
  imports: [
    IonicPageModule.forChild(CitaDisponiblePage),
    PipesModule
  ],
})
export class CitaDisponiblePageModule {}
