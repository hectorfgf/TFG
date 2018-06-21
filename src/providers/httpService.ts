import {Injectable} from '@angular/core';
import {apiURL} from "./api-route";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class HttpUsingFormDataService {


  headers: any;

  constructor(private http: HttpClient) {
    this.refrescar();
  }

  refrescar() {
    if (localStorage.getItem('token') !== null) {
      this.headers = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':
            localStorage.getItem('token')})};
    } else {
      this.headers = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    }
  }


  get(endpoint: string) {
    this.refrescar();
    return this.http.get(apiURL + endpoint, this.headers);
  }

  post(endpoint: string, json) {
    this.refrescar();
    return this.http.post(apiURL + endpoint,this.bodyToString(json), this.headers);
  }

  put(endpoint: string, json) {
    this.refrescar();
    return this.http.put(apiURL + endpoint, this.bodyToString(json), this.headers);
  }

  delete(endpoint: string) {
    this.refrescar();
    return this.http.delete(apiURL + endpoint, this.headers);
  }

  bodyToString(json) {
    let urlSearchParams = '';
    Object.keys(json).forEach(function (key) {
      if (json[key] != null) {
        urlSearchParams += this.encode(key + '')
          + '=' + this.encode(json[key] + '') + '&';
      }
    }, this);
    return urlSearchParams;
  }

  postReset(endpoint: string, json) {
    return this.http.post(apiURL + endpoint, json, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }

  encode(cadena) {
    cadena = cadena.replace(/&/g, '%26');
    cadena = cadena.replace(/\+/g, '%2B');
    cadena = cadena.replace(/=/g, '%3D');
    cadena = cadena.replace(/\?/g, '%3F');
    return cadena;
  }
}
