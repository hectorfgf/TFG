import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the ControlSesionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControlSesionProvider {

  login = new BehaviorSubject<boolean>(this.checkToken());

  constructor(public http: HttpUsingFormDataService) {

  }

  checkToken(): boolean {
    return localStorage.getItem('token') ? true: false;
  }

  public getLoginStatus(): Observable<boolean> {
    return this.login.asObservable();
  }

  setUserInformation(telefono, user){
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('id', user.id);
    localStorage.setItem('name', user.name);
    localStorage.setItem('smsCode', user.smsCode);
    localStorage.setItem('isRegistered', user.found);
  }

  setUserRegisterInformation(user){
    localStorage.setItem('telefono', user.telephone);
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
  getTelephone(){
    return localStorage.getItem('telefono');
  }

  setToken(token){
    localStorage.setItem('token',token);
    this.login.next(true);
  }

  getToken(){
    return localStorage.getItem('token');
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

  getCodigo(){
    return localStorage.getItem('smsCode');
  }
  setCodigo(code){
    localStorage.setItem('smsCode', code);
  }

  setNombre(nombre){
    localStorage.setItem('name', nombre);
  }


  logOut(){
    this.login.next(false);
    localStorage.clear();
  }

}
