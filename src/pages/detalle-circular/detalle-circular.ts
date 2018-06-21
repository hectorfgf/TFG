import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CircularProvider} from "../../providers/circulares/circulares";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";

/**
 * Generated class for the DetalleCircularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-circular',
  templateUrl: 'detalle-circular.html',
})
export class DetalleCircularPage {

  public circular: any;
  public content: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private circularProvider: CircularProvider, private sessionController: ControlSesionProvider) {
    this.circular = this.navParams.get('circular');
    this.getContent();
  }

  getContent(){
    this.circularProvider.getCircular(this.circular.id, this.sessionController.getUserId()).subscribe( (data: any) => {
      this.content = null;
      if(data.success){
        this.content = data.content;
      }
    }, ()=> {
      this.content = null;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleCircularPage');
  }
  downloadAttachment(attachment){
    this.circularProvider.donwloadCircular(attachment);
  }

}
