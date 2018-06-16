import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import * as moment from 'moment';
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  startTime= new Date().toISOString();
  endTime =  new Date().toISOString();
  startHour= new Date().toISOString();
  endHour =  new Date().toISOString();
  minDate = new Date().toISOString();
  interval: number = 15;
  week = [false,false,false,false,false,false,false];
  hours=[7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private controlHorarios: ControlHorariosProvider, private controlSesion: ControlSesionProvider,
              private toastr: ToastController) {
  }

  cancel() {
    this.viewCtrl.dismiss(true);
  }

  add(){
    let daysOfWeek =[];
    for(let i=0; i< this.week.length; i++){
      if(this.week[i]){
        daysOfWeek.push(i);
      }
    }
    this.controlHorarios.postHorarios(
      moment.utc(this.startTime).format('YYYY-MM-DD'),
      moment.utc(this.endTime).format('YYYY-MM-DD'),
      moment.utc(this.startHour).format('H:mm:ss'),
      moment.utc(this.endHour).format('H:mm:ss'),
      daysOfWeek,
      this.interval,
      this.controlSesion.getUserId()).subscribe( (response: any)=>{
        if(response.success){
          this.viewCtrl.dismiss(true);
        }else{
          this.toastr.create(
            {
              message: 'Ha ocurrido un error, no se pudo añadir el horario',
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
