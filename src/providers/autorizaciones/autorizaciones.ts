import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";
import {apiURL} from "../api-route";

@Injectable()
export class AutorizacionProvider {

  constructor(public http: HttpUsingFormDataService) {

  }

  getAutorizaciones(padre){
    return this.http.get("parents/" + padre +'/messages?type=Authorization');
  }

  getAutorizacion(autorizacionesId, padreId, estudianteId){
    return this.http.get( "parents/" + padreId + "/authorizations/" + autorizacionesId + "?student=" + estudianteId);
  }

  sendAutorization(respuesta, padre, autorizacion, estudiante){
    return this.http.post( "authorizationsreplies", {'authorized' : respuesta, 'parent': padre, 'authorization' : autorizacion, 'student' : estudiante});
  }
  actualiceAutorization(id,respuesta, padre, autorizacion, estudiante){
    return this.http.put( "authorizationsreplies/"+ id, {'authorized' : respuesta, 'parent': padre, 'authorization' : autorizacion, 'student' : estudiante});
  }
  donwloadAuthorization(autorizacion){
    window.open(apiURL+'authorizations/donwload?attachment='+autorizacion,'_system','location=yes');
  }
}
