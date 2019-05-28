import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders();
  constructor(private http: HttpClient) { }

  login(user: User) {
    this.headers.set('Content-Type', 'application/json');
    this.headers.set( 'Accept', 'application/json');
    this.headers.set('Access-Control-Allow-Credentials', 'true');
    this.headers.set('Access-Control-Allow-Origin', 'true');
    console.log(this.headers);
    return this.http.post('https://localhost:5000/users/login/', user, {headers: this.headers} );
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('iduser');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('selectedOffer');
  }

  public get loggedIn(): boolean {
    return (sessionStorage.getItem('access_token') !== null);
  }

  public get isAdmin(): boolean {
    return (sessionStorage.getItem('role') !== null &&  (Number(sessionStorage.getItem('role')) === 1 ));
  }
}
