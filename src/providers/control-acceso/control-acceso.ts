import { Injectable } from '@angular/core';
import {HttpUsingFormDataService} from "../httpService";

@Injectable()
export class ControlAccesoProvider {

  constructor(public http: HttpUsingFormDataService) {

  }

  login(telefono){
    return this.http.get('parents?telephone='+telefono);
  }

  loginCode(telefono,code){
    return this.http.post('login',{'telephone': telefono, 'code': code});
  }
  loginProfesor(username,password){
    return this.http.post('login',{'username': username, 'password': password});
  }

  register(telefono, nombre){
    return this.http.post('register', {'name' : nombre, 'telephone' : telefono});
  }

  cambiarNombre(padre, nombre){
    return this.http.put("parents/" + padre, {'newName' : nombre});
  }
}
