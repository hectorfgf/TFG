import { Component } from '@angular/core';
import {ActionSheetController, AlertController, NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {HttpErrorResponse} from "@angular/common/http";
import {AutorizacionProvider} from "../../providers/autorizaciones/autorizaciones";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {CentroSeleccionPage} from "../centro-seleccion/centro-seleccion";

@Component({
  selector: 'autorizaciones',
  templateUrl: 'autorizaciones.html'
})
export class AutorizacionesPage {

  private autorizaciones: any[];
  private searchTerm: string;
  private autorizaciones_filtered: any[];


  constructor(public navCtrl: NavController,  public autorizacionProvider: AutorizacionProvider, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private controlSesionProvider: ControlSesionProvider) {
    this.autorizaciones = [];
    this.autorizaciones_filtered = [];
    this.searchTerm = "";
    this.refrescarAutorizaciones(0);

  }
  refrescarAutorizaciones(refresher){
    this.autorizaciones = [];
    this.autorizaciones_filtered = [];
    this.autorizacionProvider.getAutorizaciones(this.controlSesionProvider.getUserId()).subscribe(
      (data: any) => {
        this.autorizaciones = [];
        this.autorizaciones_filtered = [];
        for(let e of data.content) {
          this.autorizaciones.push(e);
          this.autorizaciones_filtered.push(e);
        }
        if(refresher != 0){
          refresher.complete();
        }
      },
      (error: HttpErrorResponse) => {
        if(refresher != 0){
          refresher.complete();
        }
        this.navCtrl.setRoot(LoginPage);
      }
    );
  }


  ionViewDidEnter() {
    this.refrescarAutorizaciones(0);
  }

  mostrarDetalle(circular){
    // this.navCtrl.push(DetalleAutorizacionPage, { circular })
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
