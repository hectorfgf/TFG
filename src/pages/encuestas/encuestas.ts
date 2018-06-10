import { Component } from '@angular/core';
import {ActionSheetController, AlertController, NavController} from 'ionic-angular';
import {EncuestasProvider} from "../../providers/encuestas/encuestas";
import {LoginPage} from "../login/login";
import {HttpErrorResponse} from "@angular/common/http";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {CentroSeleccionPage} from "../centro-seleccion/centro-seleccion";
import {DetalleEncuestaPage} from "../detalle-encuesta/detalle-encuesta";
import {PerfilPage} from "../perfil/perfil";
import {ListadoHijosPage} from "../listado-hijos/listado-hijos";

@Component({
  selector: 'encuestas',
  templateUrl: 'encuestas.html'
})
export class EncuestasPage {

  private encuestas: any[];
  private searchTerm: string;
  private encuestas_filtered: any[];

  constructor(public navCtrl: NavController, public encuestaProvider: EncuestasProvider,public alertCtrl: AlertController,  public actionSheetCtrl: ActionSheetController, private controlSesionProvider: ControlSesionProvider) {

    this.encuestas = [];
    this.encuestas_filtered = [];
    this.searchTerm = "";
    this.refrescarEncuestas(0);
  }
  refrescarEncuestas(refresher){
    this.encuestas = [];
    this.encuestas_filtered = [];
    this.encuestaProvider.getEncuestas(this.controlSesionProvider.getUserId()).subscribe(
      (data: any) => {
        this.encuestas = [];
        this.encuestas_filtered = [];
        if(data.success){
          for(let e of data.content) {
            this.encuestas.push(e);
            this.encuestas_filtered.push(e);
          }
        }
        if(refresher != 0){
          refresher.complete();
        }
      },
      (error: HttpErrorResponse) => {
        if(refresher != 0){
          refresher.complete();
        }
        this.navCtrl.popToRoot();
        this.navCtrl.setRoot(LoginPage);
      }
    );
  }
  ionViewDidEnter() {
    this.refrescarEncuestas(0);
  }
  mostrarDetalle(encuesta){
    this.navCtrl.push(DetalleEncuestaPage, { encuesta });
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
      text: 'Mis centros',
      handler: () => {
        this.navCtrl.push(CentroSeleccionPage, {'flag' : true});
      }
    });
    buttons.push({
      text: 'Mis hijos',
      handler: () => {
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
                this.navCtrl.popToRoot();
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
