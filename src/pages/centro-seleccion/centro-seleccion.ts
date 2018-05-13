import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {ControlCentrosProvider} from "../../providers/control-centros/control-centros";
import {TabsPage} from "../tabs/tabs";

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private controlCentros: ControlCentrosProvider,
              private toastr: ToastController, private controlSesion: ControlSesionProvider) {
    this.userId = this.controlSesion.getUserId();
    this.controlCentros.getCentrosPadre(this.userId).subscribe((response: any)=>{
      console.log(response);
      if(response.success){
        this.centros = response.content;
      }
    });
  }

  addCentros(){
    this.disableAdd = true;
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
  }

 // addCentres(){
 //    angular.forEach(document.getElementById('centerSelector-form5').querySelectorAll('input[type=checkbox]:checked'), function(input){
 //      $centreId = input.parentNode.parentNode.id;
 //      $centreId = $centreId.substring($centreId.lastIndexOf("-") + 1);
 //      httpService.postCall("parents/" + $parentId + '/centres/' + $centreId, {});
 //    });
 //    $state.go('tabsController.circulars');
 //  }

}
