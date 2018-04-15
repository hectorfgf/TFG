import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {TabsPage} from "../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-sms-validar',
  templateUrl: 'sms-validar.html',
})
export class SmsValidarPage {

  disableCheck =false;
  codigo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private controlSesion: ControlSesionProvider, private toastr: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmsValidarPage');
  }

  checkCodigo(){
    this.disableCheck = true;
    const code = this.controlSesion.getSMSCodigo();
    if(code === this.codigo){
      this.navCtrl.setRoot(TabsPage);
    }else{
      this.toastr.create(
        {
          message: 'El código de confirmación es erroneo',
          duration: 3000,
          position: 'bottom',
          showCloseButton: true
        }
      ).present();
      this.disableCheck = false;
    }
  }

  cancelar(){
    this.navCtrl.pop();
  }
}
