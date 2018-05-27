import { NgModule } from '@angular/core';
import {IonicModule} from "ionic-angular";
import {CircularComponent} from "./circular/circular";
import {EncuestaComponent} from "./encuesta/encuesta";
import {AutorizacionComponent} from "./autorizacion/autorizacion";


@NgModule({
  declarations: [CircularComponent, EncuestaComponent, AutorizacionComponent],
  imports: [IonicModule],
  exports: [CircularComponent, EncuestaComponent, AutorizacionComponent]
})
export class ComponentsModule {}
