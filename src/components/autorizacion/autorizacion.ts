import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'autorizacion',
  templateUrl: 'autorizacion.html'
})
export class AutorizacionComponent {

  @Input()
  public autorizacion: any;

  constructor(public navCtrl: NavController, public domSanitizer: DomSanitizer) {

  }

}
