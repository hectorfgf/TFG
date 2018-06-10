import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";

/*
  Generated class for the ControlHorariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControlHorariosProvider {

  constructor(public http: HttpUsingFormDataService) {
    console.log('Hello ControlHorariosProvider Provider');
  }


  getHorarios(profesor){
    return this.http.get('teachers/'+profesor+'/schedules');
  }
}
