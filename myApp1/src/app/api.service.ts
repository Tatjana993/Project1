import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './model/user/user.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
   private headers = new HttpHeaders();
   user: User;
   selectedUser: User = {
     iduser: 0,
     first_name: '',
     last_name: '',
     username: '',
     phone: '',
     email: '',
     password: '',
     role: 5
   };
  constructor(private httpClient: HttpClient) { }

 public getUsers() {
    return this.httpClient.get<User[]>('http://localhost:5000/users/users');
  }

  public getUser() {
    const t = localStorage.getItem('access_token');
    console.log('55555555555555555555555555555555555555555555555555555555555555555555555555555555');
    this.headers = new HttpHeaders({'authorization': 'Bearer ' + t});
    console.log(this.headers);
   /* return this.httpClient.get('http://localhost:5000/users/user/' + 43, {params: new HttpParams()
    .append('token', localStorage.getItem('access_token'))}); */
    const id = localStorage.getItem('iduser');
    return this.httpClient.get('http://localhost:5000/users/user/' + id, {headers: this.headers});
  }

  public deleteUser(user: User) {
    this.headers.set('Content-Type', 'application/json');
    console.log('////// ' + user.iduser);
    return this.httpClient.delete('http://localhost:5000/users/user/' + user.iduser, {headers: this.headers}  );
  }

  public createUser(user: User) {
    this.headers.set('Content-Type', 'application/json');
    this.user = new User();
    /*return this.httpClient.post('http://localhost:5000/users/user/',
    {first_name: 'Milica', last_name: 'Tadic', username: 'mica123', phone: '065-565-856', email: 'mica@gmial.com', password: 'mica123'},
     { headers: this.headers }); */
     return this.httpClient.post('http://localhost:5000/users/user/', this.selectedUser, {headers: this.headers} );
  }

  public updateUser(user: User) {
    const t = localStorage.getItem('access_token');
    this.headers = new HttpHeaders({'authorization': 'Bearer ' + t});
    return this.httpClient.put('http://localhost:5000/users/user/', user, {headers: this.headers} );
  }

  public loginUser(user: User) {
    this.headers.set('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:5000/users/login/', user, {headers: this.headers} );
  }

  public createOrder(order: string) {
    const t = localStorage.getItem('access_token');
    console.log('55555555 narucivanje hrane');
    this.headers = new HttpHeaders({'authorization': 'Bearer ' + t});
    return this.httpClient.get('http://localhost:5000/restaurants/offer/' + 2 );
    // return this.httpClient.post('http://localhost:5000/restaurants/offer/orde/', order, {headers: this.headers});
  }

  // public login(username)
}
