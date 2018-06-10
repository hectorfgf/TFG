import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";

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
    return this.http.post( "authorizationreplies", {'authorized' : respuesta, 'parentId': padre, 'authorizationId' : autorizacion, 'studentId' : estudiante});
  }
  actualiceAutorization(id,respuesta, padre, autorizacion, estudiante){
    return this.http.put( "authorizationreplies/"+ id, {'authorized' : respuesta, 'parentId': padre, 'authorizationId' : autorizacion, 'studentId' : estudiante});
  }
}
