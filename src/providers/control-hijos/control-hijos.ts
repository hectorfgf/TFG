import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";

@Injectable()
export class ControlHijosProvider {

  constructor(public http: HttpUsingFormDataService) {

  }

 getHijosPadre(id){
  return this.http.get("parents/" + id +'/students');
 }

 deleteHijo(padre, hijo){
    return this.http.delete("parents/" + padre + "/students/" + hijo);
 }
}
