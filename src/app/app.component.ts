import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {JwtHelper} from "angular2-jwt";
import {TabsPage} from "../pages/tabs/tabs";
import {ControlSesionProvider} from "../providers/control-sesion/control-sesion";
import {ListadoHorariosPage} from "../pages/listado-horarios/listado-horarios";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private control: ControlSesionProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if (localStorage.getItem('token')) {
      const decodeToken = new JwtHelper().decodeToken(localStorage.getItem('token'));
      if(decodeToken.rol === 'progenitor'){
        this.rootPage = TabsPage;
      }else if(decodeToken.rol==='teacher'){
        this.rootPage = ListadoHorariosPage;
      }else{
        this.rootPage = LoginPage;
      }
    } else {
      this.rootPage = LoginPage;
    }
    this.control.getLoginStatus().subscribe(res => {
      if (res) {
        if (localStorage.getItem('token')) {
          const decodeToken = new JwtHelper().decodeToken(localStorage.getItem('token'));
          if(decodeToken.rol === 'progenitor'){
            this.rootPage = TabsPage;
          }else if(decodeToken.rol==='teacher'){
            this.rootPage = ListadoHorariosPage;
          }
        } else {
          this.rootPage = LoginPage;
        }
      } else {
        this.rootPage = LoginPage;
      }
    });



  }
}
