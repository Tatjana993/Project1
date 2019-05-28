import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { User } from './../model/user/user.model';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  invalidLogin: boolean;
  serverMessages: String;
  user: User = {
    iduser: 0,
    first_name: '',
    last_name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    role: 5
  };
  //  private auth: AuthService,
  constructor(private formBuilder: FormBuilder,  private router: Router,
  private auth: AuthService) {
   }

   onSubmit(form: NgForm) {
    this.auth.login(this.user)
    .pipe(first())
    .subscribe(
      result => {
      console.log(sessionStorage.getItem('role'));
      if ( Number(sessionStorage.getItem('role')) === 1 ) { // role === 1 => is Admin
        this.router.navigate(['login']); } else { this.router.navigate(['']); } },
      err => { this.serverMessages = 'Invalid login'; console.log('error'); }
    );
}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
