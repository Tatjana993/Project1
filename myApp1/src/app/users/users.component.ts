import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { User } from '../model/user/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],

})


export class UsersComponent implements OnInit {

  users: Array<User> = [];
  currentUser = localStorage.getItem('username');
  constructor(private apiService: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe((data: Array<User>) => { this.users = data;  console.log(this.users); });
  }

  deleteUser(user: User) {
    this.apiService.deleteUser(user).subscribe(data => { this.users = this.users.filter(u => u !== user); console.log(data); });
  }

  createUser() {
   // this.apiService.createUser().subscribe(data => { console.log(data); });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
