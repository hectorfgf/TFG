import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController, ModalController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {ListadoHijosPage} from "../listado-hijos/listado-hijos";
import {PerfilPage} from "../perfil/perfil";
import {CentroSeleccionPage} from "../centro-seleccion/centro-seleccion";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";
import moment from "moment";
import {SolicitarCitaPage} from "../solicitar-cita/solicitar-cita";

@Component({
  selector: 'page-citas-padre',
  templateUrl: 'citas-padre.html',
})
export class CitasPadrePage {
  eventSource = [];
  viewTitle: string = '';
  selectedDay = new Date();
  isToday:boolean;
  oldDate = new Date(2000, 1, 1, 0, 0, 0, 0);

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController, private controlSesionProvider: ControlSesionProvider,
              private modalCtrl: ModalController, public horariosControl: ControlHorariosProvider,
              private toastr: ToastController,) {
    this.loadEvents();
  }

  loadEvents(){
    let dates = [];
    this.horariosControl.getCitasPadre(this.controlSesionProvider.getUserId()).subscribe((response: any) =>{
      if(response.success){
        let horariosHijos = response.content.schedules;
        for (let horarios of horariosHijos) {
          for (let horario of horarios) {
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
                title = 'Petición: ' + horario.teacher.name +' ('+horario.student.name + ')';
                break;
              case 2:
                title = 'Cita: ' + horario.teacher.name +' ('+horario.student.name + ')';
                break;
              case 3:
                title = 'Cancelada: ' + horario.teacher.name +' ('+horario.student.name + ')';
                break;
            }
            dates.push({title: title, startTime: horaIni, endTime: horaFin, allDay: false, data: horario});
          }
        }
      }
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = dates;
      });

    });
  }
  ionViewDidEnter() {
    this.loadEvents();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(event) {
    this.selectedDay = event.selectedTime;
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onEventSelected(event) {
    switch(event.data.status){
      case 1:
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
                this.horariosControl.cancelarCita(event.data.id).subscribe( (response:any) => {
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
                this.horariosControl.renovarSolicitarCita(event.data.id).subscribe( (response:any) => {
                  if(response.success){
                    this.loadEvents();
                  }else{
                    this.toastr.create(
                      {
                        message: 'Ha ocurrido un error, no se pudo renovar la peticion de la cita',
                        duration: 3000,
                        position: 'bottom',
                        showCloseButton: true
                      }
                    ).present();
                  }
                }, ()=>{
                  this.toastr.create(
                    {
                      message: 'Ha ocurrido un error, no se pudo renovar la peticion de la cita',
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

  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    if(moment(this.oldDate).format('MM') === moment(event.getTime()).format('MM')){
      this.changeMode('day');
    }
    this.oldDate = event;
  }

  solicitarTutoria(){
    let modal = this.modalCtrl.create('SolicitarCitaPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.loadEvents();
      }
    });
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
