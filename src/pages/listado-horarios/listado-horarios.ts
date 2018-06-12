import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import moment from "moment";
import {CrearHorarioPage} from "../crear-horario/crear-horario";

/**
 * Generated class for the ListadoHorariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado-horarios',
  templateUrl: 'listado-horarios.html',
})
export class ListadoHorariosPage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController, public  controlHorarios: ControlHorariosProvider, public controlSesion: ControlSesionProvider) {
    let dates  =this.eventSource;
    this.controlHorarios.getHorarios(this.controlSesion.getUserId()).subscribe((response: any) =>{
      if(response.success){
        let horarios = response.content.schedules;
        for(let horario of horarios){
          const horaIni = new Date(horario.schedule.date);
          const horaFin = new Date(horario.schedule.date);
          horaIni.setHours(parseInt(moment(horario.timeFrom.date).format('H')));
          horaIni.setMinutes(parseInt(moment(horario.timeFrom.date).format('mm')));
          horaFin.setHours(parseInt(moment(horario.timeTo.date).format('H')));
          horaFin.setMinutes(parseInt(moment(horario.timeTo.date).format('mm')));
          dates.push({title: horario.id, startTime: horaIni, endTime:horaFin, allDay: false});
        }
      }
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = dates;
        console.log(this.eventSource);
      });

    });
  }
  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data);
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          console.log(this.eventSource);
        });
      }
    });
  }


  addSchedule(){
    this.navCtrl.push(CrearHorarioPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoHorariosPage');
  }


  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

}
