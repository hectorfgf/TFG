import { Component } from '@angular/core';
import {ActionSheetController, AlertController, NavController} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {AutorizacionProvider} from "../../providers/autorizaciones/autorizaciones";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {CentroSeleccionPage} from "../centro-seleccion/centro-seleccion";
import {DetalleAutorizacionPage} from "../detalle-autorizacion/detalle-autorizacion";
import {PerfilPage} from "../perfil/perfil";
import {ListadoHijosPage} from "../listado-hijos/listado-hijos";
import * as moment from 'moment';
import * as locales from 'moment/min/locales';
moment.locale('es');

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
        if(data.success){
          for(let e of data.content) {
            e.from_now = moment(e.sendingDate).fromNow();
            e.expire = moment(e.limitDate).fromNow();
            if(moment(e.limitDate).diff(moment()) < 0){
              e.isExpired= true;
            }else{
              e.isExpired= false;
            }
            this.autorizaciones.push(e);
            this.autorizaciones_filtered.push(e);
          }
          this.autorizaciones.sort( (a,b) => {
            return a.read > b.read ? 1 : (a.read < b.read ?  -1 : 0);
          });
        }
        if(refresher != 0){
          refresher.complete();
        }
      },
      (error: HttpErrorResponse) => {
        if(refresher != 0){
          refresher.complete();
        }
        this.controlSesionProvider.logOut();
      }
    );
  }


  ionViewDidEnter() {
    this.refrescarAutorizaciones(0);
  }

  mostrarDetalle(autorizacion){
    this.navCtrl.push(DetalleAutorizacionPage, { autorizacion })
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
      text: 'Cerrar sesión',
      handler: () => {
        this.alertCtrl.create({
          title: '¿Desea cerrar sessión?',
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
}
