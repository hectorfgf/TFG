import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlCentrosProvider} from "../../providers/control-centros/control-centros";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlHijosProvider} from "../../providers/control-hijos/control-hijos";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ListadoHijosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado-hijos',
  templateUrl: 'listado-hijos.html',
})
export class ListadoHijosPage {
  userId:any;
  hijos: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private controlHijos: ControlHijosProvider,
              private toastr: ToastController, private controlSesion: ControlSesionProvider,  public alertCtrl: AlertController,) {
    this.userId = this.controlSesion.getUserId();
    this.controlHijos.getHijosPadre(this.userId).subscribe((response: any)=>{
      if(response.success){
        this.hijos = response.content.childrens;
      }
    });
  }

  deleteHijo(hijo){
    this.alertCtrl.create({
      title: '¿Esta seguro que desea deshasociar el hijo?',
      subTitle: 'Esta accion sera irreversible',
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
            this.controlHijos.deleteHijo(this.userId,hijo.id).subscribe( ()=> {
              let index = this.hijos.indexOf(hijo);
              if(index > -1){
                this.hijos.splice(index, 1);
              }
              this.toastr.create(
                {
                  message: 'Hijo eliminado con exito',
                  duration: 3000,
                  position: 'bottom',
                  showCloseButton: true
                }
              ).present();
            }, () =>{
              this.toastr.create(
                {
                  message: 'No se pudo deshasociar el hijo',
                  duration: 3000,
                  position: 'bottom',
                  showCloseButton: true
                }
              ).present();
            });
          }
        }
      ]
    }).present();

  }

}
