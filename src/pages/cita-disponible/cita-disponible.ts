import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";

/**
 * Generated class for the CitaDisponiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cita-disponible',
  templateUrl: 'cita-disponible.html',
})
export class CitaDisponiblePage {

  private alumnos: any[];
  private searchTerm: string;
  private alumnos_filtered: any[];
  private alumno_check: any[];
  private alumno_selected:any;
  private schedule:any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public navParams: NavParams, private control: ControlHorariosProvider,
              private controlSesion: ControlSesionProvider, private toastr: ToastController,
              public alertCtrl: AlertController) {
    this.schedule = this.navParams.get('schedule');
    this.alumnos = [];
    this.alumnos_filtered = [];
    this.searchTerm = "";
    this.refrescarAlumnos();
  }

  refrescarAlumnos() {
    this.alumnos = [];
    this.alumnos_filtered = [];
    this.alumno_check = [];
    this.control.getAlumnos(this.controlSesion.getUserId()).subscribe(
      (data: any) => {
        this.alumnos = [];
        this.alumnos_filtered = [];
        if(data.success){
          for (let e of data.content.students) {
            this.alumnos.push(e);
            this.alumnos_filtered.push(e);
            this.alumno_check[e.id] = false;
          }
        }
      }
    );
  }
  cancel() {
    this.viewCtrl.dismiss(true);
  }

  select(alumno){
    this.alumno_selected = alumno;
    for (let student of this.alumnos) {
      this.alumno_check[student.id] = false;
    }
    this.alumno_check[alumno] = true;
  }

  eliminar(){

    this.alertCtrl.create({
      title: '¿Desea eliminar el horario?',
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
            this.control.eliminar(this.schedule.id).subscribe( (response:any) => {
              if(response.success){
                this.viewCtrl.dismiss(true);
              }else{
                this.toastr.create(
                  {
                    message: 'Ha ocurrido un error, no se pudo borrar el horario',
                    duration: 3000,
                    position: 'bottom',
                    showCloseButton: true
                  }
                ).present();
              }
            }, ()=>{
              this.toastr.create(
                {
                  message: 'Ha ocurrido un error, no se pudo borrar el horario',
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

  add(){
    this.control.asociarAlumnoHorario(this.alumno_selected,this.schedule.id,2).subscribe( (response:any) => {
      if(response.success){
        this.viewCtrl.dismiss(true);
      }else{
        this.toastr.create(
          {
            message: 'Ha ocurrido un error, no se pudo asignar la cita',
            duration: 3000,
            position: 'bottom',
            showCloseButton: true
          }
        ).present();
      }
    }, ()=>{
      this.toastr.create(
        {
          message: 'Ha ocurrido un error, no se pudo asignar la cita',
          duration: 3000,
          position: 'bottom',
          showCloseButton: true
        }
      ).present();
    });
  }

}
