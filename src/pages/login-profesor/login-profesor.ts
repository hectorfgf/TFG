import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlAccesoProvider} from "../../providers/control-acceso/control-acceso";
import {JwtHelper} from "angular2-jwt";
import {ListadoHorariosPage} from "../listado-horarios/listado-horarios";

/**
 * Generated class for the LoginProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-profesor',
  templateUrl: 'login-profesor.html',
})
export class LoginProfesorPage {

  private username:string;
  private password:string;
  private disableLogin: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private accesoControl: ControlAccesoProvider,
              private controlSesion: ControlSesionProvider, private toastr: ToastController) {
    this.username = "";
    this.password = "";
    this.disableLogin=false;
  }

  doLogin() {
    this.disableLogin = true;
    this.accesoControl.loginProfesor(this.username, this.password).subscribe((response:any)=>{
      if(response.success){
        this.controlSesion.setToken(response.content);
        const decodeToken = new JwtHelper().decodeToken(response.content);
        this.controlSesion.setNombre(decodeToken.username);
        this.controlSesion.setUserId(decodeToken.id);
        this.navCtrl.setRoot('ListadoHorariosPage');
      }else{
        this.toastr.create(
          {
            message: 'Credenciales inválidas',
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

  goBack(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginProfesorPage');
  }

}
