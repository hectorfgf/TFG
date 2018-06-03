import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiURL} from "../api-route";

@Injectable()
export class EncuestasProvider {

  constructor(public http: HttpClient) {

  }

  getEncuestas(padre){
    return this.http.get(apiURL+"parents/" + padre +'/messages?type=Poll');
  }

  getEncuesta(pollId, padreId){
    return this.http.get(apiURL+"polls/" + pollId + "?parent=" + padreId);
  }

  responderEncuesta(padre, option){
    return this.http.post(apiURL+"pollreplies", {'parentId': padre, 'pollOptionId' : option});
  }
}
