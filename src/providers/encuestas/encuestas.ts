import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";
import {apiURL} from "../api-route";

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
    return this.http.post("pollsreplies", {'parent': padre, 'pollOptionId' : option});
  }
  donwloadPoll(poll){
    window.open(apiURL+'polls/donwload?attachment='+poll,'_system','location=yes');
  }
}
