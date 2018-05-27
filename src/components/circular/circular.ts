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
  selector: 'circular',
  templateUrl: 'circular.html'
})
export class CircularComponent {

  @Input()
  public circular: any;

  constructor(public navCtrl: NavController, public domSanitizer: DomSanitizer) {

  }

}
