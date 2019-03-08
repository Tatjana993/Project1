import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./../../../node_modules/material-design-iconic-font/dist/css/material-design-iconic-font.min.css',
  './../../../node_modules/font-awesome/css/font-awesome.min.css',
  './css/main.css']
})
export class UserCreateComponent implements OnInit {
  userCreateForm: FormGroup;
  emailRegex = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  phoneRegex = '[0-9]{3}[-/][0-9]{3}-[0-9]{3}';
  showSucessMessage: boolean;
  serverErrorMessages: string;


  constructor(private apiService: ApiService) { }


  ngOnInit() {
    this.userCreateForm = new FormGroup({
      'phone': new FormControl(this.apiService.selectedUser.phone, Validators.pattern(this.phoneRegex)),
    });
  }

  onSubmit(form: NgForm) {
    this.apiService.createUser(form.value).subscribe(data => {
      console.log(data);
      const vel = JSON.stringify(data);
      if (vel.includes('status')) {
        if (vel.includes('exists')) {
          this.serverErrorMessages = 'Username exists';
        } else {
          this.serverErrorMessages = 'Unsuccessful';
        }
      } else {
        this.resetForm(form);
        this.showSucessMessage = true;
      }
        });
    }

    resetForm(form: NgForm) {
      this.apiService.selectedUser = {
        iduser: 0,
        first_name: '',
        last_name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        role: 5
      };
      form.resetForm();
     // this.serverErrorMessages = '';
    }

    removeAll() {
      this.serverErrorMessages = '';
      this.showSucessMessage = false;
    }
  }

