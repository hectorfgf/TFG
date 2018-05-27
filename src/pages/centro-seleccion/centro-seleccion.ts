import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlCentrosProvider} from "../../providers/control-centros/control-centros";
import {TabsPage} from "../tabs/tabs";
import {CircularesPage} from "../circulares/circulares";

/**
 * Generated class for the CentroSeleccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-centro-seleccion',
  templateUrl: 'centro-seleccion.html',
})
export class CentroSeleccionPage {

  userId:any;
  centros: any[] = [];
  disableAdd: boolean;
  centrosSelccionados: any[]=[];
  primeraVez = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, private controlCentros: ControlCentrosProvider,
              private toastr: ToastController, private controlSesion: ControlSesionProvider) {
    if(this.navParams.get('flag')){
      this.primeraVez = false;
    }
    this.userId = this.controlSesion.getUserId();
    this.controlCentros.getCentrosPadre(this.userId).subscribe((response: any)=>{
      console.log(response);
      if(response.success){
        this.centros = response.content;
        for(let centro of  this.centros) {
          this.centrosSelccionados[centro.id] = centro.isSet;
        }
      }
    });
  }

  addCentros(){
    this.disableAdd = true;
    this.controlCentros.deleteCentros(this.userId).subscribe( ()=> {
      Object.keys(this.centrosSelccionados).forEach(function(key) {
        if(this.centrosSelccionados[key]) this.controlCentros.addCentro(key, this.userId).subscribe((response:any)=>{
          if(!response.success){
            this.toastr.create(
              {
                message: 'No se pudo añadir el centro',
                duration: 3000,
                position: 'bottom',
                showCloseButton: true
              }
            ).present();
          }
        });
      }, this);
      this.navCtrl.setRoot(TabsPage);
    }, ()=>{
      this.disableAdd = false;
      this.toastr.create(
        {
          message: 'Ocurrio un error al intentar actualizar los centros',
          duration: 3000,
          position: 'bottom',
          showCloseButton: true
        }
      ).present();
    });
  }

}
