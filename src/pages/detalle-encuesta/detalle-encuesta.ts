import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {EncuestasProvider} from "../../providers/encuestas/encuestas";
import moment from 'moment';

/**
 * Generated class for the DetalleEncuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-encuesta',
  templateUrl: 'detalle-encuesta.html',
})
export class DetalleEncuestaPage {
  public encuesta: any;
  public content: any;
  public activa: boolean;
  public opcionesSeleccionadas: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private encuestaProvider: EncuestasProvider,
              private controlSesion: ControlSesionProvider) {
    this.activa = true;
    this.opcionesSeleccionadas= [];
    this.encuesta = this.navParams.get('encuesta');
    this.getContent();
  }

  getContent(){
    this.encuestaProvider.getEncuesta(this.encuesta.id, this.controlSesion.getUserId()).subscribe( (data: any) => {
      console.log(data);
      this.content = null;
      if(data.success){
        for(let opcion of  data.content.options) {
          this.opcionesSeleccionadas[opcion.id] = false;
        }
        this.content = data.content;
        if(moment().diff(moment(this.content.limitDate)) > 0) this.activa = false;
      }
    }, ()=> {
      this.content = null;
    });
  }

  enviarRespuesta(){
    for(let option of Object.keys(this.opcionesSeleccionadas)){
      if(this.opcionesSeleccionadas[option]){
        this.encuestaProvider.responderEncuesta( this.controlSesion.getUserId(),option).subscribe(()=>{});
      }
    }
    this.content.replied= true;
  }

  revisar(id){
    if(!this.content.multiple){
      for(let option of Object.keys(this.opcionesSeleccionadas)){
        if(parseInt(option) !== id){
          this.opcionesSeleccionadas[option] = false;
        }else{
          this.opcionesSeleccionadas[option] = true;
        }
      }
    }
  }

}
