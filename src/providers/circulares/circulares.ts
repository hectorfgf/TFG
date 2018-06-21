import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";
import {apiURL} from "../api-route";

@Injectable()
export class CircularProvider {

  constructor(public http: HttpUsingFormDataService) {

  }

  getCirculares(padre){
    return this.http.get("parents/" + padre +'/messages?type=Circular');
  }

  getCircular(circularId, padre){
    return this.http.get("circulars/" + circularId + "/parents/" + padre);
  }
  donwloadCircular(circular){
    window.open(apiURL+'circulars/donwload?attachment='+circular,'_system','location=yes');
  }
}
