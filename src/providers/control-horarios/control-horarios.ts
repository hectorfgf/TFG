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

  getHorariosPendientes(profesor){
    return this.http.get('teachers/'+profesor+'/schedules?status=1');
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

  postDeleteHorarios(dateFrom,dateTo,teacher){
    return this.http.post('schedules/deleteRange', {
      dateFrom: dateFrom,
      dateTo: dateTo,
      teacher: teacher
    });
  }

  getAlumnos(profesor){
    return this.http.get('teachers/'+profesor+'/students');
  }

  eliminar(schedule){
    return this.http.delete('schedules/'+schedule);
  }

  asociarAlumnoHorario(alumno, schedule, estado){
    return this.http.post('schedules/'+schedule+'/students/'+alumno, {
      status: estado
    });
  }
  cancelarCita(schedule){
    return this.http.put('schedules/'+schedule, {
      status: 3
    });
  }
  restablecerCita(schedule){
    return this.http.put('schedules/'+schedule, {
      status: 2
    });
  }

  renovarSolicitarCita(schedule){
    return this.http.put('schedules/'+schedule, {
      status: 1
    });
  }

  getCitasPadre(padre){
    return this.http.get('parents/'+padre+'/schedules');
  }
}
