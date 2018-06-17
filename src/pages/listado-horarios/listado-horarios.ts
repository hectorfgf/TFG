import {Component, ViewChild} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, ModalController, NavController,
  NavParams, ToastController
} from 'ionic-angular';
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {CalendarComponent} from "ionic2-calendar/calendar";
import {BorrarHorariosPage} from "../borrar-horarios/borrar-horarios";
import {ProfesorProfilePage} from "../profesor-profile/profesor-profile";
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

  @ViewChild(CalendarComponent) myCalendar:CalendarComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private alertCtrl: AlertController,
              public  controlHorarios: ControlHorariosProvider, public controlSesion: ControlSesionProvider,
              public actionSheetCtrl: ActionSheetController, private toastr: ToastController) {
    this.loadEvents();
  }

  addSchedule(){
    let modal = this.modalCtrl.create('EventModalPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.loadEvents();
      }
    });
  }
  removeSchedules(){
    let modal = this.modalCtrl.create('BorrarHorariosPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.loadEvents();
      }
    });
  }

  loadEvents(){
    let dates = [];
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
          let title = '';
          switch (horario.status) {
            case 0:
              title = 'Disponible';
              break;
            case 1:
              title = 'Petición: ' + horario.student.name + ' ' + horario.student.surname;
              break;
            case 2:
              title = 'Cita: ' + horario.student.name + ' ' + horario.student.surname;
              break;
            case 3:
              title = 'Cancelada: ' + horario.student.name + ' ' + horario.student.surname;
              break;
          }
          dates.push({title: title, startTime: horaIni, endTime:horaFin, allDay: false, data: horario});
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
    console.log(event);
    switch(event.data.status){
      case 0:
        let modal = this.modalCtrl.create('CitaDisponiblePage', {schedule: event.data});
        modal.present();
        modal.onDidDismiss(data => {
          if (data) {
            this.loadEvents();
          }
        });
        break;
      case 1:
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
                this.controlHorarios.restablecerCita(event.data.id).subscribe( (response:any) => {
                  if(response.success){
                    this.loadEvents();
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
        break;
      case 2:
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
                this.controlHorarios.cancelarCita(event.data.id).subscribe( (response:any) => {
                  if(response.success){
                    this.loadEvents();
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
        break;
      case 3:
        this.alertCtrl.create({
          title: '¿Desea restablecer la cita?',
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
                this.controlHorarios.restablecerCita(event.data.id).subscribe( (response:any) => {
                  if(response.success){
                    this.loadEvents();
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
        break;
    }
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

  settings() {
    let buttons = [];
    buttons.push({
      text: 'Mi perfil',
      handler: () => {
        this.navCtrl.push(ProfesorProfilePage);
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
                this.controlSesion.logOut();
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
