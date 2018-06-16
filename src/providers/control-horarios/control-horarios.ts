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

  postHorarios(dateFrom,dateTo,timeFrom,timeTo,daysOfWek,segment,teacher){
    return this.http.post('schedules', {
      dateFrom: dateFrom,
      dateTo: dateTo,
      timeFrom: timeFrom,
      timeTo: timeTo,
      daysOfWek : daysOfWek,
      segment: segment,
      teacher: teacher
    });
  }
}
