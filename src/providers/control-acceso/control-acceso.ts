import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiURL} from "../api-route";

/*
  Generated class for the ControlAccesoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControlAccesoProvider {

  constructor(public http: HttpClient) {

  }

  login(telefono){
    return this.http.get(apiURL+'parents?telephone='+telefono);
  }
}
