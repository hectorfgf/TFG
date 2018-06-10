import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlAccesoProvider} from "../../providers/control-acceso/control-acceso";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {SmsValidarPage} from "../sms-validar/sms-validar";
import {RegistroPage} from "../registro/registro";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public telefono: string;
  private disableLogin: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, private accesoControl: ControlAccesoProvider,
              private controlSesion: ControlSesionProvider, private toastr: ToastController) {
    this.telefono = "";
  }

  doLogin() {
    this.disableLogin = true;
    this.accesoControl.login(this.telefono).subscribe((response:any)=>{
      if(response.success && response.content.found){
        this.controlSesion.setUserInformation(this.telefono, response.content);
        this.navCtrl.push('SmsValidarPage');
      }else{
        this.toastr.create(
          {
            message: 'No se encuentra el telefono introducido',
            duration: 3000,
            position: 'bottom',
            showCloseButton: true
          }
        ).present();
        this.disableLogin = false;
      }
    }, error =>{
      this.toastr.create(
        {
          message: 'Ha ocurrido un error, intentelo mas tarde.',
          duration: 3000,
          position: 'bottom',
          showCloseButton: true
        }
      ).present();
      this.disableLogin = false;
    });
  }

  goRegister(){
    this.navCtrl.push('RegistroPage');
  }

  goLoginProfesor(){
    this.navCtrl.push('LoginProfesorPage');
  }

}
