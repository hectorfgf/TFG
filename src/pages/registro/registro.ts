import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ControlAccesoProvider} from "../../providers/control-acceso/control-acceso";
import {ControlSesionProvider} from "../../providers/control-sesion/control-sesion";
import {CentroSeleccionPage} from "../centro-seleccion/centro-seleccion";
import {JwtHelper} from "angular2-jwt";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  public telefono: string;
  public nombre: string;
  private disableRegister: boolean;
  form: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private toastr: ToastController,
              private accesoControl: ControlAccesoProvider,private controlSesion: ControlSesionProvider, private formBuilder: FormBuilder) {
    this.telefono = "";
    this.nombre = "";
    this.form = this.formBuilder.group({
      terms: [false,  matchTrue()]
    });

  }

  doRegister() {
    this.disableRegister = true;
    this.accesoControl.register(this.telefono, this.nombre).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        const token =response.content;
        const tokenDecodificado = new JwtHelper().decodeToken(token);
        this.controlSesion.setUserRegisterInformation(tokenDecodificado);
        this.navCtrl.push('CentroSeleccionPage', {token : token});
      }else{
        this.toastr.create(
          {
            message: 'Ha ocurrido un error, no se pudo registrar',
            duration: 3000,
            position: 'bottom',
            showCloseButton: true
          }
        ).present();
        this.disableRegister = false;
      }
    });
  }

}


export function matchTrue () {


  return function matchOtherValidate (control: FormControl) {

    if (!control.value) {
      return {
        matchTrue: true
      };
    }
    return null;
  }

}
