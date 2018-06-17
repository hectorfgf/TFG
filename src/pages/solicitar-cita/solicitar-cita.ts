import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, ModalController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import moment from "moment";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";
import {ControlHijosProvider} from "../../providers/control-hijos/control-hijos";

/**
 * Generated class for the SolicitarCitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitar-cita',
  templateUrl: 'solicitar-cita.html',
})
export class SolicitarCitaPage {
  teacher_selected: any;
  alumno_selected: any;
  teachers: any[];

  eventSource = [];
  viewTitle: string = '';
  selectedDay = new Date();
  isToday:boolean;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-ES',
    startingDayMonth :1,
    showEventDetail: false,
    noEventsLabel: '',
    startHour: 7,
    endHour: 21,
    timeInterval: 15,
    dateFormatter: {
      formatMonthViewDay: function(date:Date) {
        return date.getDate().toString();
      },
      formatDayViewHourColumn: function(date:Date) {
        return  date.getHours().toString() + ':' + ((date.getMinutes().toString() < '10') ? '0'+date.getMinutes().toString() : date.getMinutes().toString());
      }
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private modalCtrl: ModalController, private alertCtrl: AlertController,
              public  controlHorarios: ControlHorariosProvider, public controlSesion: ControlSesionProvider,
              public actionSheetCtrl: ActionSheetController, private toastr: ToastController,
              public controlHijos: ControlHijosProvider) {
    this.teachers = [];
    this.refrescarTeachers();
  }

  refrescarTeachers() {
    this.teachers = [];
    this.controlHijos.getProfesoresHijos(this.controlSesion.getUserId()).subscribe(
      (data: any) => {
        this.teachers = [];
        if(data.success){
          for (let e of data.content.teachers) {
            this.teachers.push(e);
          }
        }
      }
    );
  }

  cancel() {
    this.viewCtrl.dismiss(true);
  }

  select(teacher,alumno){
    this.teacher_selected = teacher;
    this.alumno_selected = alumno;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitarCitaPage');
  }



  searchSchedules(){
    if(this.teacher_selected !== null){
      this.loadEvents();
    }
  }

  loadEvents(){
    let dates = [];
    this.controlHorarios.getHorarios(this.teacher_selected).subscribe((response: any) =>{
      if(response.success){
        let horarios = response.content.schedules;
        for(let horario of horarios){
          const horaIni = new Date(horario.schedule.date);
          const horaFin = new Date(horario.schedule.date);
          horaIni.setHours(parseInt(moment(horario.timeFrom.date).format('H')));
          horaIni.setMinutes(parseInt(moment(horario.timeFrom.date).format('mm')));
          horaFin.setHours(parseInt(moment(horario.timeTo.date).format('H')));
          horaFin.setMinutes(parseInt(moment(horario.timeTo.date).format('mm')));
          let title = '';
          switch (horario.status) {
            case 0:
              title = 'Disponible';
              dates.push({title: title, startTime: horaIni, endTime:horaFin, allDay: false, data: horario});
              break;
          }
        }
      }
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = dates;
      });

    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    this.alertCtrl.create({
      title: '¿Desea solicitar la cita?',
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
            this.controlHorarios.asociarAlumnoHorario(this.alumno_selected, event.data.id, 1).subscribe( (response:any) => {
              if(response.success){
                this.viewCtrl.dismiss(true);
              }else{
                this.toastr.create(
                  {
                    message: 'Ha ocurrido un error, no se pudo solicitar la cita',
                    duration: 3000,
                    position: 'bottom',
                    showCloseButton: true
                  }
                ).present();
              }
            }, ()=>{
              this.toastr.create(
                {
                  message: 'Ha ocurrido un error, no se pudo solicitar la cita',
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

  onTimeSelected(event) {
    this.selectedDay = event.selectedTime;
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  today() {
    this.calendar.currentDate = new Date();
  }


}
