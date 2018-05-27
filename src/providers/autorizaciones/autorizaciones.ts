import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiURL} from "../api-route";

@Injectable()
export class AutorizacionProvider {

  constructor(public http: HttpClient) {

  }

  getAutorizaciones(padre){
    return this.http.get(apiURL+"parents/" + padre +'/messages?type=Authorization');
  }

  getAutorizacion(autorizacionesId, padreId, estudianteId){
    return this.http.get(apiURL+ "parents/" + padreId + "/authorizations/" + autorizacionesId + "?student=" + estudianteId);
  }
}
