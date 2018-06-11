import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {CalendarComponentOptions, CalendarModal, CalendarResult} from "ion2-calendar";
import moment from "moment";

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

  horarios:any[];
  date: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public  controlHorarios: ControlHorariosProvider, public controlSesion: ControlSesionProvider, public modalCtrl: ModalController) {
    this.horarios = [];
    this.controlHorarios.getHorarios(this.controlSesion.getUserId()).subscribe((response: any) =>{
      if(response.success){
        this.horarios = response.content.schedules;
        for(let horario of this.horarios){
          console.log(moment(horario.schedule.date).format('YYYY-MM-DD'));
          this.date.push(new Date(horario.schedule.date));
        }
      }
    });
  }

  openCalendar() {
    const options = {
      pickMode: 'multi',
      title: 'Tutorias Disponibles',
      defaultDates: this.date
    };

    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult[], type: string) => {
      console.log(date);
    })
  }
  addSchedule(){
    console.log('te miro y te añado');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoHorariosPage');
  }

}
