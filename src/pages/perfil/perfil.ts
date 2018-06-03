import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  user: any;
  name: any;
  telephone: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sesionProvider: ControlSesionProvider) {
    this.user = sesionProvider.getUserInformation();
    this.name = this.user.name;
    this.telephone = this.user.telefono;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
