import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiURL} from "../api-route";

@Injectable()
export class CircularProvider {

  constructor(public http: HttpClient) {

  }

  getCirculares(padre){
    return this.http.get(apiURL+"parents/" + padre +'/messages?type=Circular');
  }

  getCircular(circularId){
    return this.http.get(apiURL+"circulars/" + circularId);
  }
}
