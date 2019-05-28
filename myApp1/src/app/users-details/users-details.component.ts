import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../model/user/user.model';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {phoneNumberValidator} from './../validators/phone-validator';
import {emailValidator} from './../validators/email-validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
//  './../../../node_modules/material-design-iconic-font/dist/css/material-design-iconic-font.min.css',
//  './../../../node_modules/font-awesome/css/font-awesome.min.css',
//  './css/main.css']   // 'vendor/bootstrap/css/bootstrap.min.css'
})
export class UsersDetailsComponent implements OnInit {

  id: number;
  user: User;
  editForm: FormGroup;
  serverMessages: String;
  currentUser = sessionStorage.getItem('username');
  submitted = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private formBuilder: FormBuilder,
    private auth: AuthService, private router: Router) {
    this.route.params.subscribe( params => { this.id = params.id;  console.log(this.id); });
   }

  ngOnInit() {
    sessionStorage.setItem('sessionstorage', '1');
    localStorage.setItem('localstorage', '2');
    this.editForm = this.formBuilder.group({
      iduser: [],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', phoneNumberValidator],
      email: ['', Validators.email],
      password: [],
      deleted: [],
      role: []
    });
    this.apiService.getUser().subscribe((data: User) => { this.user = data; console.log(this.user[0]);
      this.editForm.setValue(this.user[0]);
     });
  }

  onSubmit() {
    this.submitted = true;
    this.serverMessages = '';
        // stop here if form is invalid
        if (this.editForm.invalid) {
          console.log('7777777777777');
            return;
        }
    this.apiService.updateUser(this.editForm.value).subscribe( (data: String) => { this.serverMessages = data; console.log(data); } );
  }

  get editFormControl() {
    return this.editForm.get('editForm');
  }
  get first_name() {
    return this.editForm.get('first_name');
  }

  get last_name() {
    return this.editForm.get('last_name');
  }

  get username() {
    return this.editForm.get('username');
  }

  get phone() {
    return this.editForm.get('phone');
  }
  get email() {
    return this.editForm.get('email');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  myorders() {
   // this.router.navigate(['users_details/' + localStorage.getItem('iduser') + '/myorders']);
   this.router.navigate(['users_details/' + sessionStorage.getItem('iduser') + '/myorders']);
  }
  myhome() {
    this.router.navigate(['']);
  }

}
