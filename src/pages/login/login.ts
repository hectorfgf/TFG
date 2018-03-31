import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public telefono: string;
  private disableLogin: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,) {
    this.telefono = "";
  }

  doLogin() {
    this.disableLogin = true;
  }
  goRegister(){
    this.navCtrl.push('RegistroPage');
  }

}
