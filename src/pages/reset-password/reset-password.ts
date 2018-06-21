import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlAccesoProvider} from "../../providers/control-acceso/control-acceso";

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  private username:string;
  private disableReset: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private accesoControl: ControlAccesoProvider,
              private controlSesion: ControlSesionProvider, private toastr: ToastController) {
    this.username = "";
    this.disableReset=false;
  }

  reset() {
    this.disableReset = true;
    this.accesoControl.resetPassword(this.username).subscribe((response:any)=>{
        this.toastr.create(
          {
            message: 'Revise su correo electronico, si no le ha llegado intentelo de nuevo',
            duration: 3000,
            position: 'bottom',
            showCloseButton: true
          }
        ).present();
      this.navCtrl.pop();
        this.disableReset = false;
    }, error =>{
      this.toastr.create(
        {
          message: 'Ha ocurrido un error, intentelo mas tarde.',
          duration: 3000,
          position: 'bottom',
          showCloseButton: true
        }
      ).present();
      this.disableReset = false;
    });
  }

  goBack(){
    this.navCtrl.pop();
  }
}
