import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPageModule} from "../pages/login/login.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ControlAccesoProvider } from '../providers/control-acceso/control-acceso';
import { ControlSesionProvider } from '../providers/control-sesion/control-sesion';
import {RegistroPageModule} from "../pages/registro/registro.module";
import {SmsValidarPageModule} from "../pages/sms-validar/sms-validar.module";
import {CentroSeleccionPage} from "../pages/centro-seleccion/centro-seleccion";
import {CentroSeleccionPageModule} from "../pages/centro-seleccion/centro-seleccion.module";
import {ControlCentrosProvider} from "../providers/control-centros/control-centros";



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    LoginPageModule,
    RegistroPageModule,
    SmsValidarPageModule,
    CentroSeleccionPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ControlAccesoProvider,
    ControlSesionProvider,
    ControlCentrosProvider
  ]
})
export class AppModule {}
