import {Component} from '@angular/core';
import {ActionSheetController, AlertController, NavController} from 'ionic-angular';
import {CircularProvider} from "../../providers/circulares/circulares";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginPage} from "../login/login";
import {DetalleCircularPage} from "../detalle-circular/detalle-circular";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {CentroSeleccionPage} from "../centro-seleccion/centro-seleccion";
import {ListadoHijosPage} from "../listado-hijos/listado-hijos";

@Component({
  selector: 'circulares',
  templateUrl: 'circulares.html'
})
export class CircularesPage {

  private circulares: any[];
  private searchTerm: string;
  private circulares_filtered: any[];


  constructor(public navCtrl: NavController, public circularProvider: CircularProvider,public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private controlSesionProvider: ControlSesionProvider) {
    this.circulares = [];
    this.circulares_filtered = [];
    this.searchTerm = "";
    this.refrescarCircualares(0);

  }

  refrescarCircualares(refresher) {
    this.circulares = [];
    this.circulares_filtered = [];
    this.circularProvider.getCirculares(this.controlSesionProvider.getUserId()).subscribe(
      (data: any) => {
        this.circulares = [];
        this.circulares_filtered = [];
        for (let e of data.content) {
          this.circulares.push(e);
          this.circulares_filtered.push(e);
        }
        if (refresher != 0) {
          refresher.complete();
        }
      },
      (error: HttpErrorResponse) => {
        if (refresher != 0) {
          refresher.complete();
        }
        this.navCtrl.setRoot(LoginPage);
      }
    );
  }


  ionViewDidEnter() {
    this.refrescarCircualares(0);
  }

  mostrarDetalle(circular) {
    this.navCtrl.push(DetalleCircularPage, {circular})
  }

  settings() {
    let buttons = [];
    buttons.push({
        text: 'Mi perfil',
        handler: () => {
          // todo pagina mi perfil
        }
    });
    buttons.push({
      text: 'Mis centros',
      handler: () => {
        this.navCtrl.push(CentroSeleccionPage, {'flag' : true});
      }
    });
    buttons.push({
      text: 'Mis hijos',
      handler: () => {
        // todo pagina mis hijos
        this.navCtrl.push(ListadoHijosPage);
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
                this.navCtrl.setRoot(LoginPage);
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

}
