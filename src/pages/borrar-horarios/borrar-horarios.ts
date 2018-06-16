import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import * as moment from "moment";
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";


@IonicPage()
@Component({
  selector: 'page-borrar-horarios',
  templateUrl: 'borrar-horarios.html',
})
export class BorrarHorariosPage {

  startTime= new Date().toISOString();
  endTime =  new Date().toISOString();

  minDate = new Date().toISOString();

  week = [false,false,false,false,false,false,false];

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private controlHorarios: ControlHorariosProvider, private controlSesion: ControlSesionProvider,
              private toastr: ToastController) {
  }

  cancel() {
    this.viewCtrl.dismiss(true);
  }

  delete(){
    let daysOfWeek =[];
    for(let i=0; i< this.week.length; i++){
      if(this.week[i]){
        daysOfWeek.push(i);
      }
    }
    this.controlHorarios.postDeleteHorarios(
      moment.utc(this.startTime).format('YYYY-MM-DD'),
      moment.utc(this.endTime).format('YYYY-MM-DD'),
      this.controlSesion.getUserId()).subscribe( (response: any)=>{
      if(response.success){
        this.viewCtrl.dismiss(true);
      }else{
        this.toastr.create(
          {
            message: 'Ha ocurrido un error, no se pudo eliminar el horario',
            duration: 3000,
            position: 'bottom',
            showCloseButton: true
          }
        ).present();
      }
    }, () =>{
      this.toastr.create(
        {
          message: 'Ha ocurrido un error, no se pudo añadir el horario',
          duration: 3000,
          position: 'bottom',
          showCloseButton: true
        }
      ).present();
    });
  }
}
