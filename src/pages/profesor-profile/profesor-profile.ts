import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlAccesoProvider} from "../../providers/control-acceso/control-acceso";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {JwtHelper} from "angular2-jwt";

/**
 * Generated class for the ProfesorProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profesor-profile',
  templateUrl: 'profesor-profile.html',
})
export class ProfesorProfilePage {
  name: any;
  username: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sesionProvider: ControlSesionProvider,
              public alertCtrl: AlertController, private toastr: ToastController, private controlAcceso: ControlAccesoProvider) {
    this.controlAcceso.getProfesorData(this.sesionProvider.getUserId()).subscribe( (response:any) => {
      if(response.success && response.content.teacher){
        this.name = response.content.teacher.name;
        this.username = response.content.teacher.username;
      }else{
        this.navCtrl.pop();
      }
    }, ()=>{
      this.navCtrl.pop();
    });
  }

  cambiarNombre(){
    this.alertCtrl.create({
      title: 'Actualizar nombre',
      inputs: [{
        name: 'nombre',
        placeholder: 'Introduzca su nuevo nombre',
        type: 'text'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            if(data.nombre !== null){
              this.controlAcceso.cambiarNombreProfesor(this.sesionProvider.getUserId(), data.nombre)
                .subscribe( (response:any) => {
                  if(response.success){
                    this.name = data.nombre;
                  }else{
                    this.toastr.create(
                      {
                        message: response.error,
                        duration: 3000,
                        position: 'bottom',
                        showCloseButton: true
                      }
                    ).present();
                  }
                }, ()=>{
                  this.toastr.create(
                    {
                      message: "Ha ocurrido un error inesperado, intentelo mas tarde",
                      duration: 3000,
                      position: 'bottom',
                      showCloseButton: true
                    }
                  ).present();
                });
            }
          }
        }
      ]
    }).present();
  }

  cambiarContrasena(){
    this.alertCtrl.create({
      title: 'Cambiar contraseña',
      inputs: [{
        name: 'code',
        label:'Contraseña actual',
        placeholder: 'Introduzca aquí su contraseña actual',
        type: 'password'
      },{
        name: 'newCode',
        label:'Contraseña nueva',
        placeholder: 'Introduzca aquí la nueva contraseña',
        type: 'password'
      },{
        name: 'newConfirmCode',
        label:'Comfirmar contraseña nueva',
        placeholder: 'Repita la nueva contraseña',
        type: 'password'
      }      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            if(data.newCode == data.newConfirmCode){
              const token = this.sesionProvider.getToken();
              const decodeToken = new JwtHelper().decodeToken(token);
              this.controlAcceso.postCambiarPassword(decodeToken.sub,data.code, data.newCode, data.newConfirmCode)
                .subscribe( (response:any) =>{
                  if(response.success){
                    this.toastr.create(
                      {
                        message: response.content,
                        duration: 3000,
                        position: 'bottom',
                        showCloseButton: true
                      }
                    ).present();
                  }else{
                    this.toastr.create(
                      {
                        message: response.error,
                        duration: 3000,
                        position: 'bottom',
                        showCloseButton: true
                      }
                    ).present();
                  }
                });
            }else{
              this.toastr.create(
                {
                  message: 'La confirmacion y la nueva contraseña deben coincidir',
                  duration: 3000,
                  position: 'bottom',
                  showCloseButton: true
                }
              ).present();
            }
          }
        }
      ]
    }).present();
  }
}
