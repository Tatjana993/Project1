import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './model/user/user.model';
import { ApiService } from './api.service';
import { Headers } from '@angular/http';
import { OfferlistService } from './offerlist.service';

 @Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders();
  constructor(private http: HttpClient, public offerlistservice: OfferlistService) { }

  login(user: User): Observable<boolean> {
    this.headers.set('Content-Type', 'application/json');
    this.headers.set( 'Accept', 'application/json');
    this.headers.set('Access-Control-Allow-Credentials', 'true');
    this.headers.set('Access-Control-Allow-Origin', 'true');
    console.log(this.headers);
    return this.http.post<{obj: JSON}>('https://localhost:5000/users/login/', user, {headers: this.headers} )
    .pipe(
      map(result => {
        console.log(result.obj);
      /*  localStorage.setItem('access_token', result.obj['status']);
        localStorage.setItem('iduser', result.obj['iduser']);
        localStorage.setItem('username', result.obj['username']);
        localStorage.setItem('role', result.obj['role']);
        localStorage.setItem('fleg', 'true'); */
        sessionStorage.setItem('access_token', result.obj['status']);
        sessionStorage.setItem('iduser', result.obj['iduser']);
        sessionStorage.setItem('username', result.obj['username']);
        sessionStorage.setItem('role', result.obj['role']);
        sessionStorage.setItem('fleg', 'true');
        return true;
      })
    );

  }

  logout() {
   /* localStorage.removeItem('access_token');
    localStorage.removeItem('iduser');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('selectedOffer'); */
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('iduser');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('selectedOffer');
  }

  public get loggedIn(): boolean {
   // return (localStorage.getItem('access_token') !== null);
   return (sessionStorage.getItem('access_token') !== null);
  }

  public get isAdmin(): boolean {
  //  return (localStorage.getItem('role') !== null &&  (Number(localStorage.getItem('role')) === 1 ));
  return (sessionStorage.getItem('role') !== null &&  (Number(sessionStorage.getItem('role')) === 1 ));
  }
  public getUser() {
   // const h = new Headers({'authorization': localStorage.getItem('access_token')});
   /* this.headers.set('Content-Type', 'application/json');
    this.headers.set( 'Accept', 'application/json');
    this.headers.set('Access-Control-Allow-Credentials', 'true');
    this.headers.set('Access-Control-Allow-Origin', 'true');
    this.headers.set('authorization', localStorage.getItem('access_token')); */
    return this.http.get('http://localhost:5000/users/user/' + 43);
   /* return this.http.get('http://localhost:5000/users/user/' + 43, {params: new HttpParams()
    .append('token', localStorage.getItem('access_token'))}); */
  }
}
