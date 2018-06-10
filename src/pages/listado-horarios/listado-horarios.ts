import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ControlHorariosProvider} from "../../providers/control-horarios/control-horarios";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public  controlHorarios: ControlHorariosProvider, public controlSesion: ControlSesionProvider) {
    this.horarios = [];
    this.controlHorarios.getHorarios(this.controlSesion.getUserId()).subscribe((response: any) =>{
      if(response.success){
        this.horarios = response.content.schedules;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoHorariosPage');
  }

}
