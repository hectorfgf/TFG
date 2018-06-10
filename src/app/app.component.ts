import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {JwtHelper} from "angular2-jwt";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    if (localStorage.getItem('token')) {
      const decodeToken = new JwtHelper().decodeToken(localStorage.getItem('token'));
      if(decodeToken.rol === 'progenitor'){
        this.rootPage = 'TabsPage';
      }else if(decodeToken.rol==='teacher'){
        this.rootPage = 'HomeProfesorPage';
      }
      this.rootPage = 'TabsPage';
    } else {
      this.rootPage = 'LoginPage';
    }
  }
}
