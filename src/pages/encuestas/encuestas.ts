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
import * as moment from 'moment';
import * as locales from 'moment/min/locales';
moment.locale('es');

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
            e.from_now = moment(e.sendingDate).fromNow();
            e.expire = moment(e.limitDate).fromNow();
            if(moment(e.limitDate).diff(moment())< 0){
              e.isExpired= true;
            }else{
              e.isExpired= false;
            }
            this.encuestas.push(e);
            this.encuestas_filtered.push(e);
          }
          this.encuestas.sort( (a,b) => {
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
