import { Component } from '@angular/core';
import { Restaurant } from './../model/restaurant/restaurant.model';
import { RestaurantsService } from '../restaurants.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { User } from '../model/user/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
 // './vendor/bootstrap/css/bootstrap.min.css'],
})
export class HomePage {

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

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService,
    public toastController: ToastController) {
  }

  onSubmit(form: NgForm) {
    this.auth.login(this.user).subscribe((data: JSON) => {
      console.log(data);
      if (data['obj'] === undefined) {
        this.presentToastWithOptions();
        console.log('error');
      } else {
        // console.log('login');
        sessionStorage.setItem('access_token', data['obj'].status);
        this.router.navigate(['./restaurants']);
      }
    });
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Invalid login',
      showCloseButton: true,
      duration: 3000,
      position: 'top',
      closeButtonText: 'Close'
    });
    toast.present();
  }
}
