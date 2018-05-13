import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ControlSesionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControlSesionProvider {

  constructor(public http: HttpClient) {

  }

  setUserInformation(telefono, user){
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('id', user.id);
    localStorage.setItem('name', user.name);
    localStorage.setItem('smsCode', user.smsCode);
    localStorage.setItem('isRegistered', user.found);
  }

  setUserId(id){
    localStorage.setItem('id', id);
  }
  getUserId(){
    return localStorage.getItem('id');
  }

  getUserInformation(){
    return {
      telefono: localStorage.getItem('telefono'),
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      smsCode: localStorage.getItem('smsCode'),
      isRegistered: localStorage.getItem('isRegistered')
    }
  }

  getSMSCodigo(){
    return localStorage.getItem('smsCode');
  }

}
