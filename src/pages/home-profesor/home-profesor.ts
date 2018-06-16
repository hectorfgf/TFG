import { Component } from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PerfilPage} from "../perfil/perfil";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ListadoHorariosPage} from "../listado-horarios/listado-horarios";

/**
 * Generated class for the HomeProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-profesor',
  templateUrl: 'home-profesor.html',
})
export class HomeProfesorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
              private controlSesionProvider: ControlSesionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeProfesorPage');
  }


  settings() {
    let buttons = [];
    buttons.push({
      text: 'Mi perfil',
      handler: () => {
        this.navCtrl.push(PerfilPage);
      }
    });
    buttons.push({
      text: 'Cerrar sesion',
      handler: () => {
        this.alertCtrl.create({
          title: '¿Desea cerrar session?',
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
                this.controlSesionProvider.logOut();
              }
            }
          ]
        }).present();

      }
    });
    buttons.push({
      text: 'CANCELAR',
      role: 'cancel',
    });

    let actionSheet = this.actionSheetCtrl.create({
      buttons: buttons
    });
    actionSheet.present();
  }

  irVerHorarios(){
    this.navCtrl.push(ListadoHorariosPage);

  }
}
