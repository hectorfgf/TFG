import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlAccesoProvider} from "../../providers/control-acceso/control-acceso";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private sesionProvider: ControlSesionProvider,
  public alertCtrl: AlertController, private toastr: ToastController, private controlAcceso: ControlAccesoProvider) {
    this.user = sesionProvider.getUserInformation();
    this.name = this.user.name;
    this.telephone = this.user.telefono;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
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
              this.controlAcceso.cambiarNombre(this.sesionProvider.getUserId(), data.nombre)
                .subscribe( (response:any) => {
                  if(response.success){
                    this.sesionProvider.setNombre(data.nombre);
                    this.name = data.nombre;
                  }else{
                    this.toastr.create(
                      {
                        message: 'Ocurrio un error inesperado',
                        duration: 3000,
                        position: 'bottom',
                        showCloseButton: true
                      }
                    ).present();
                  }
                });
            }

          }
        }
      ]
    }).present();
  }

  cambiarCodigo(){
    this.alertCtrl.create({
      title: 'Cambiar codigo de seguridad',
      inputs: [{
        name: 'code',
        label:'Código actual',
        placeholder: 'Introduzca aquí su código actual',
        type: 'password'
      },{
        name: 'newCode',
        label:'Código nuevo',
        placeholder: 'Introduzca aquí el código nuevo',
        type: 'password'
      },{
        name: 'newConfirmCode',
        label:'Comfirmar código nuevo',
        placeholder: 'Repita el código nuevo',
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
            if(data.code === this.sesionProvider.getCodigo()){
              if(data.newCode == data.newConfirmCode){
                this.sesionProvider.setCodigo(data.newCode);
              }else{
                this.toastr.create(
                  {
                    message: 'El código nuevo y la confirmación deben coincidir',
                    duration: 3000,
                    position: 'bottom',
                    showCloseButton: true
                  }
                ).present();
              }
            }else{
              this.toastr.create(
                {
                  message: 'El código introducido es incorrecto',
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
