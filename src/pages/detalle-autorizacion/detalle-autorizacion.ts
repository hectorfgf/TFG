import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AutorizacionProvider} from "../../providers/autorizaciones/autorizaciones";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import moment from "moment";
import {LoginPage} from "../login/login";

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
  public activa: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private autorizacionProvider: AutorizacionProvider,
              private controlSesion: ControlSesionProvider, public alertCtrl: AlertController, private toastr: ToastController) {
    this.activa = true;
    this.autorizacion = this.navParams.get('autorizacion');
    this.getContent();
  }

  getContent(){
    this.autorizacionProvider.getAutorizacion(this.autorizacion.id, this.controlSesion.getUserId() ,this.autorizacion.studentId).subscribe( (data: any) => {
      this.content = null;
      if(data.success){
        this.content = data.content;
        if(moment().diff(moment(this.content.limitDate)) > 0) this.activa = false;
      }
    }, ()=> {
      this.content = null;
    });
  }

  showPopup(reply, id) {
    this.alertCtrl.create({
      title: 'Introduzca su código de seguridad para confirmar la acción',
      inputs: [{
        name: 'code',
        placeholder: 'Introduzca aquí su código',
        type: 'password'
      }],
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
            if(data.code === this.controlSesion.getCodigo()){
              if(id == null){
                this.autorizacionProvider.sendAutorization(reply ? 1 : 0, this.controlSesion.getUserId(), this.autorizacion.id,this.autorizacion.studentId)
                  .subscribe((response: any) => {
                    if(response.success){
                      this.content.authorized=reply;
                      this.content.reply = reply;
                      this.content.replyId = response.content.replyId;
                      this.toastr.create(
                        {
                          message: 'Modificacion de la autorización realizada correctamente',
                          duration: 3000,
                          position: 'bottom',
                          showCloseButton: true
                        }
                      ).present();
                    }
                  });
              }else{
                this.autorizacionProvider.actualiceAutorization(id,reply ? 1 : 0, this.controlSesion.getUserId(), this.autorizacion.id,this.autorizacion.studentId)
                  .subscribe((response: any) => {
                    if(response.success){
                      this.content.authorized=reply;
                      this.content.reply = reply;
                      this.toastr.create(
                        {
                          message: 'Modificacion de la autorización realizada correctamente',
                          duration: 3000,
                          position: 'bottom',
                          showCloseButton: true
                        }
                      ).present();
                    }
                  });
              }
            }else{
              this.toastr.create(
                {
                  message: 'El código introducido es incorrecto',
                  duration: 3000,
                  position: 'bottom',
                  showCloseButton: true
                }
              ).present();
            }
          }
        }
      ]
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleAutorizacionPage');
  }
  downloadAttachment(attachment){
    this.autorizacionProvider.donwloadAuthorization(attachment);
  }
}
