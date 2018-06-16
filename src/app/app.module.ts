import {NgModule, ErrorHandler, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {EncuestasPage} from '../pages/encuestas/encuestas';
import {AutorizacionesPage} from '../pages/autorizacion/autorizaciones';
import {CircularesPage} from '../pages/circulares/circulares';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPageModule} from "../pages/login/login.module";
import {HttpClientModule} from "@angular/common/http";
import {ControlAccesoProvider} from '../providers/control-acceso/control-acceso';
import {ControlSesionProvider} from '../providers/control-sesion/control-sesion';
import {RegistroPageModule} from "../pages/registro/registro.module";
import {SmsValidarPageModule} from "../pages/sms-validar/sms-validar.module";
import {CentroSeleccionPageModule} from "../pages/centro-seleccion/centro-seleccion.module";
import {ControlCentrosProvider} from "../providers/control-centros/control-centros";
import {CircularProvider} from "../providers/circulares/circulares";
import {PipesModule} from "../pipes/pipes.module";
import {ComponentsModule} from "../components/components.module";
import {DetalleCircularPageModule} from "../pages/detalle-circular/detalle-circular.module";
import {EncuestasProvider} from "../providers/encuestas/encuestas";
import {AutorizacionProvider} from "../providers/autorizaciones/autorizaciones";
import {ListadoHijosPageModule} from "../pages/listado-hijos/listado-hijos.module";
import {ControlHijosProvider} from "../providers/control-hijos/control-hijos";
import {DetalleAutorizacionPageModule} from "../pages/detalle-autorizacion/detalle-autorizacion.module";
import {DetalleEncuestaPageModule} from "../pages/detalle-encuesta/detalle-encuesta.module";
import {PerfilPageModule} from "../pages/perfil/perfil.module";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {Http, HttpModule} from '@angular/http';
import {HttpUsingFormDataService} from "../providers/httpService";
import {LoginProfesorPageModule} from "../pages/login-profesor/login-profesor.module";
import {HomeProfesorPageModule} from "../pages/home-profesor/home-profesor.module";
import {ListadoHorariosPageModule} from "../pages/listado-horarios/listado-horarios.module";
import { ControlHorariosProvider } from '../providers/control-horarios/control-horarios';
import {CrearHorarioPageModule} from "../pages/crear-horario/crear-horario.module";
import {NgCalendarModule} from "ionic2-calendar";
import {EventModalPageModule} from "../pages/event-modal/event-modal.module";
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {BorrarHorariosPageModule} from "../pages/borrar-horarios/borrar-horarios.module";
import {CitaDisponiblePageModule} from "../pages/cita-disponible/cita-disponible.module";
registerLocaleData(localeEs);



export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer ',
    noJwtError: true,
    globalHeaders: [{'Content-Type': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('token')),
  }), http);
}


@NgModule({
  declarations: [
    MyApp,
    EncuestasPage,
    AutorizacionesPage,
    CircularesPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    LoginPageModule,
    LoginProfesorPageModule,
    RegistroPageModule,
    SmsValidarPageModule,
    CentroSeleccionPageModule,
    DetalleCircularPageModule,
    DetalleAutorizacionPageModule,
    DetalleEncuestaPageModule,
    ListadoHijosPageModule,
    PerfilPageModule,
    ListadoHorariosPageModule,
    ComponentsModule,
    HomeProfesorPageModule,
    PipesModule,
    CrearHorarioPageModule,
    NgCalendarModule,
    EventModalPageModule,
    BorrarHorariosPageModule,
    CitaDisponiblePageModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EncuestasPage,
    AutorizacionesPage,
    CircularesPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    ControlAccesoProvider,
    ControlSesionProvider,
    ControlCentrosProvider,
    CircularProvider,
    EncuestasProvider,
    AutorizacionProvider,
    ControlHijosProvider,
    HttpUsingFormDataService,
    ControlHorariosProvider,
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
})
export class AppModule {}
