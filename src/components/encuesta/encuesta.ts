import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import {DomSanitizer} from "@angular/platform-browser";


/**
 * Generated class for the EventoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'encuesta',
  templateUrl: 'encuesta.html'
})
export class EncuestaComponent {

  @Input()
  public encuesta: any;

  constructor(public navCtrl: NavController, public domSanitizer: DomSanitizer) {

  }

}
