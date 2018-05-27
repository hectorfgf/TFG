import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiURL} from "../api-route";

@Injectable()
export class ControlHijosProvider {

  constructor(public http: HttpClient) {

  }

 getHijosPadre(id){
  return this.http.get(apiURL+"parents/" + id +'/students');
 }

 deleteHijo(padre, hijo){
    return this.http.delete(apiURL+"parents/" + padre + "/students/" + hijo);
 }
}
