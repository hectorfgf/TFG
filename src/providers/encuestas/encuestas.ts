import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";

@Injectable()
export class EncuestasProvider {

  constructor(public http: HttpUsingFormDataService) {

  }

  getEncuestas(padre){
    return this.http.get("parents/" + padre +'/messages?type=Poll');
  }

  getEncuesta(pollId, padreId){
    return this.http.get("polls/" + pollId + "?parent=" + padreId);
  }

  responderEncuesta(padre, option){
    return this.http.post("pollreplies", {'parentId': padre, 'pollOptionId' : option});
  }
}
