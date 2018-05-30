import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AutorizacionProvider} from "../../providers/autorizaciones/autorizaciones";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";

/**
 * Generated class for the DetalleAutorizacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-autorizacion',
  templateUrl: 'detalle-autorizacion.html',
})
export class DetalleAutorizacionPage {

  public autorizacion: any;
  public content: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private autorizacionProvider: AutorizacionProvider,
              private controlSesion: ControlSesionProvider) {
    this.autorizacion = this.navParams.get('autorizacion');
    console.log(this.autorizacion);
    this.getContent();
  }

  getContent(){
    this.autorizacionProvider.getAutorizacion(this.autorizacion.id, this.controlSesion.getUserId() ,this.autorizacion.studentId).subscribe( (data: any) => {
      console.log(data);
      this.content = null;
      if(data.success){
        this.content = data.content;
      }
    }, ()=> {
      this.content = null;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleAutorizacionPage');
  }

}
