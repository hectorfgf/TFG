import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiURL} from "../api-route";

/*
  Generated class for the ControlAccesoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControlCentrosProvider {

  constructor(public http: HttpClient) {

  }

 getCentrosPadre(id){
  return this.http.get(apiURL+'centres/' +id);
 }

 addCentro(centro, padre){
   return this.http.post(apiURL+"parents/" + padre + '/centres/' + centro, {});
 }

}
