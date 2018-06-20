import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import * as moment from "moment";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";

/**
 * Generated class for the SolicitudesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitudes',
  templateUrl: 'solicitudes.html',
})
export class SolicitudesPage {

  solicitudes: any[] = [];


  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private controlSesion: ControlSesionProvider, private horariosProvider: ControlHorariosProvider,
              private alertCtrl: AlertController, private toastr: ToastController) {
    this.getSolicitudes();
  }
  getSolicitudes(){
    this.horariosProvider.getHorariosPendientes(this.controlSesion.getUserId()).subscribe((response: any)=>{
      if(response.success){
        this.solicitudes = response.content.schedules;
      }
    });
  }

  cancel() {
    this.viewCtrl.dismiss(true);
  }

  cancelarCita(cita){
    this.alertCtrl.create({
      title: '¿Desea cancelar la cita?',
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
            this.horariosProvider.cancelarCita(cita.id).subscribe( (response:any) => {
              if(response.success){
                this.getSolicitudes();
              }else{
                this.toastr.create(
                  {
                    message: 'Ha ocurrido un error, no se pudo cancelar la cita',
                    duration: 3000,
                    position: 'bottom',
                    showCloseButton: true
                  }
                ).present();
              }
            }, ()=>{
              this.toastr.create(
                {
                  message: 'Ha ocurrido un error, no se pudo cancelar la cita',
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

  aceptarCita(cita){
    this.alertCtrl.create({
      title: '¿Desea aceptar la cita?',
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
            this.horariosProvider.restablecerCita(cita.id).subscribe( (response:any) => {
              if(response.success){
                this.getSolicitudes();
              }else{
                this.toastr.create(
                  {
                    message: 'Ha ocurrido un error, no se pudo aceptar la cita',
                    duration: 3000,
                    position: 'bottom',
                    showCloseButton: true
                  }
                ).present();
              }
            }, ()=>{
              this.toastr.create(
                {
                  message: 'Ha ocurrido un error, no se pudo aceptar la cita',
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
