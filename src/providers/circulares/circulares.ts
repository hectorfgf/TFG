import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";

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
}
