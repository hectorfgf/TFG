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

  resetPassword(email){
    return this.http.postReset('forgot_password/', {'email':  email});
  }

  register(telefono, nombre){
    return this.http.post('register', {'name' : nombre, 'telephone' : telefono});
  }

  cambiarNombre(padre, nombre){
    return this.http.put("parents/" + padre, {'newName' : nombre});
  }

  getProfesorData(profesor){
    return this.http.get("teachers/" +profesor);
  }

  postCambiarPassword(profesor, oldPassword,newPassword, confirmNewPassword){
    return this.http.put('teachers/'+profesor+'/changePassword', {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmNewPassword:confirmNewPassword
    });
  }
  cambiarNombreProfesor(profesor, nombre){
    return this.http.put("teachers/" + profesor+'/changeName', {'newName' : nombre});
  }
}
