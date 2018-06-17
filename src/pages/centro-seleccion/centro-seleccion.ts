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
  token: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private controlCentros: ControlCentrosProvider,
              private toastr: ToastController, private controlSesion: ControlSesionProvider) {
    if(this.navParams.get('flag')){
      this.primeraVez = false;
    }else{
        this.token = this.navParams.get('token');
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
      if(this.primeraVez){
        this.toastr.create(
          {
            message: 'Centros actualizados. Contacte con sus centros para que le asocie a sus hijos.',
            duration: 3000,
            position: 'bottom',
            showCloseButton: true
          }
        ).present();
        this.controlSesion.setToken(this.token);
        this.navCtrl.setRoot(TabsPage);
      }else{
        this.toastr.create(
          {
            message: 'Centros actualizados',
            duration: 3000,
            position: 'bottom',
            showCloseButton: true
          }
        ).present();
      }
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
