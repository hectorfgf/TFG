import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {HttpUsingFormDataService} from "../httpService";

/*
  Generated class for the ControlAccesoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControlCentrosProvider {

  constructor(public http: HttpUsingFormDataService) {

  }

 getCentrosPadre(id){
  return this.http.get('centres/' +id);
 }

 addCentro(centro, padre){
   return this.http.post("parents/" + padre + '/centres/' + centro, {});
 }

 deleteCentros(padre){
    return this.http.delete("parents/" + padre + "/centres");
 }
}
