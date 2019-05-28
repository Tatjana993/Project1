import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './../restaurant.service';
import { Restaurant } from '../model/restaurant/restaurant.model';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user/user.model';
import { OfferComponent } from '../offer/offer.component';
import { Offer } from '../model/offer/offer.model';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { SelectedOffer } from '../model/selectedOffer/selectedoffer.model';
import { SideDish } from '../model/sidedish/sidedish.model';
import { Shape } from '../model/restaurant/shape';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
// ,'vendor/bootstrap/css/bootstrap.min.css'
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]

})
export class HomeComponent implements OnInit {

  restaurants: Array<Restaurant> = [];
  currentUser = sessionStorage.getItem('username');
  currentUserId =  Number(sessionStorage.getItem('iduser'));
  user: User;
  offer: Offer;
  fleg = false;
  oderForm: FormGroup;

  constructor(private restaurantService: RestaurantService,
     private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    sessionStorage.setItem('sessionstorage', 'sessionstorage');
    localStorage.setItem('localstorage', 'localstorage');
    this.oderForm = this.formBuilder.group({
      address: ['', Validators.required]
    });

    console.log(this.fleg);
    if (this.restaurants.length > 0) {
      console.log('///////////');
    } else {
    this.restaurantService.getRestaurants().subscribe(( data: Array<Restaurant> ) => { this.restaurants = data;
     console.log(this.restaurants); });
    }
   // this.loadFromLocalstore();


  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  getUser() {
       const id =  Number(sessionStorage.getItem('iduser'));
       this.router.navigate(['users_details/:' + id]);
  }
 }

