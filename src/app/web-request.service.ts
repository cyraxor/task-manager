import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import { RequestOptions } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;


  constructor(private http: HttpClient) { 
    // this.ROOT_URL = 'http://localhost:3000';
    this.ROOT_URL = 'http://deneb.traubing.local:3000';  // Original
  }

  public getHeaders(): HttpHeaders {
    const token = localStorage.getItem('Bearer');  
    const headers = new HttpHeaders({
      'Accept': 'application/json;odata=verbose',
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  } 

  get(uri: string) {
    const options = { headers: this.getHeaders() };
    return this.http.get(`${this.ROOT_URL}/${uri}`, options);
  }

  post(uri: string, payload: Object) {
    const options = { headers: this.getHeaders() };

    return this.http.post(`${this.ROOT_URL}/${uri}`, payload, options);
  }

  patch(uri: string, payload: Object) {
    const options = { headers: this.getHeaders() };

    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload, options);
  }

  delete(uri: string) {
    const options = { headers: this.getHeaders() };

    return this.http.delete(`${this.ROOT_URL}/${uri}`, options)
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email, 
      password,
    }, {
      observe: 'response'
    });
  }

  logout() {
    const options = { headers: this.getHeaders() };
    return this.http.post(`${this.ROOT_URL}/users/logout`, {});
  }
}
