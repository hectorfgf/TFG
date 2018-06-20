import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import * as moment from "moment";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";

/**
 * Generated class for the SolicitudesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitudes',
  templateUrl: 'solicitudes.html',
})
export class SolicitudesPage {


  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
  }

  cancel() {
    this.viewCtrl.dismiss(true);
  }

}
