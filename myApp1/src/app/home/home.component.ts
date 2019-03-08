import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './../restaurant.service';
import { Restaurant } from '../model/restaurant/restaurant.model';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user/user.model';
import { ApiService } from '../api.service';
import { OfferComponent } from '../offer/offer.component';
import { Offer } from '../model/offer/offer.model';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Order } from '../model/order/order.model';
import { SelectedOffer } from '../model/selectedOffer/selectedoffer.model';
import { SideDish } from '../model/sidedish/sidedish.model';

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
  currentUser = localStorage.getItem('username');
  currentUserId =  Number(localStorage.getItem('iduser'));
  user: User;
  orderList: Array<Offer> = [];
  selectedOffersList: Array<SelectedOffer> = [];
  orderListToString: string;
  offer: Offer;
  fleg = false;

  oderForm: FormGroup;
  submitted: boolean;
  invalidLogin: boolean;
  serverMessages: String;
  order: Order = {
    idorder: 0,
    address: ''
  };

  constructor(private api: ApiService, private restaurantService: RestaurantService,
     private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    sessionStorage.setItem('sessionstorage', 'sessionstorage');
    localStorage.setItem('localstorage', 'localstorage');
    this.oderForm = this.formBuilder.group({
      address: ['', Validators.required]
    });

    console.log(this.fleg);
    this.restaurantService.getRestaurants().subscribe(( data: Array<Restaurant> ) => { this.restaurants = data;
     console.log(this.restaurants); });
   // this.loadFromLocalstore();
  }

  /*public loadFromLocalstore() {
    if (localStorage.getItem('selectedOffer') !== null && localStorage.getItem('selectedOffer') !== ' ') {
      console.log(localStorage.getItem('selectedOffer'));
      if (localStorage.getItem('selectedOffer') === ' ') {
        console.log('odje smooooooooooooooooooooooooooooooooooooooooooooooo');
      }
      this.fleg = true;
      const selectedOffersToSplit = localStorage.getItem('selectedOffer').split(' ');
      let i = 0;
      console.log(selectedOffersToSplit.length);
      for (i; i < selectedOffersToSplit.length - 1; i++) {
        console.log(selectedOffersToSplit[i].split('#'));
        const idoffer = Number(selectedOffersToSplit[i].split('#')[0]);
        const iduser = Number(selectedOffersToSplit[i].split('#')[1]);
        const amount = Number(selectedOffersToSplit[i].split('#')[2]);
        const sd = selectedOffersToSplit[i].split('#')[3].split(',');
        const sidedishes = [];
        for (let y = 0; y < sd.length - 1; y++) {
          sidedishes[y] = Number(sd[y]);
        }
        console.log('parsiranoo ' + idoffer + 'amount ' + amount);
        const selectedoffer = new SelectedOffer(idoffer, iduser, amount, sidedishes, ins);
        this.selectedOffersList.push(selectedoffer);
        this.restaurantService.getOfferById(idoffer)
        .subscribe((data: Offer) => {console.log(data); this.offer = data; this.orderList.push(this.offer[0]);
          console.log(this.offer[0].name);  console.log('Array length ' + this.orderList.length); });
      }
      const tostring = this.orderList.toString();
      console.log('************************** ');
      console.log(tostring);
      }
  } */

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  getUser() {
    // this.api.getUser().subscribe((data: User) => { this.user = data;
     //  console.log(this.user[0].username + ' id= ' + this.user[0].iduser);
       const id =  Number(localStorage.getItem('iduser'));
       this.router.navigate(['users_details/:' + id]);
  }

 /* printSelected() {
    console.log('////////////');
    console.log(localStorage.getItem('selectedOffer'));
    if (localStorage.getItem('selectedOffer') !== null) {
    const selectedOffersToSplit = localStorage.getItem('selectedOffer').split(' ');
    let i = 0;
    console.log(selectedOffersToSplit.length);
    for (i; i < selectedOffersToSplit.length - 1; i++) {
      const idoffer = Number(selectedOffersToSplit[i].split('#')[0]);
      console.log('parsiranoo ' + idoffer);
      this.restaurantService.getOfferById(idoffer)
      .subscribe((data: Offer) => {console.log(data); this.orderList.push(data); });
    }
    const toOrder = localStorage.getItem('selectedOffer');
    localStorage.removeItem('selectedOffer');
    this.fleg = false;
    this.restaurantService.createOrder(toOrder)
    .subscribe((data: JSON) => { console.log('bbbbbbb'); });
    }
  } */

/*  onSubmit(form: NgForm) {

    console.log('on Submit() ' + this.order.address);
    if (localStorage.getItem('selectedOffer') !== null) {
        console.log(this.selectedOffersList);
      const toOrder = {selectedOfferList: this.selectedOffersList, address: this.order.address};
      console.log(toOrder);
      localStorage.removeItem('selectedOffer');
      this.fleg = false;
      this.restaurantService.createOrder(toOrder)
      .subscribe((data: JSON) => { console.log('bbbbbbb'); this.formReset(form); });
      }
 }

 formReset(form: NgForm) {
  this.oderForm = this.formBuilder.group({
    address: ['', Validators.required]
  });
  this.order = {
    idorder: 0,
    address: ''
  };
 }

 getName(idoffer: number) {
   let i = 0;
   for (i; i < this.orderList.length; i++) {
     if (this.orderList[i].idoffer === idoffer) {
       return this.orderList[i].name;
     }
   }
 }

 getOfferPrice(idoffer: number) {
  let i = 0;
  for (i; i < this.orderList.length; i++) {
    if (this.orderList[i].idoffer === idoffer) {
      return this.orderList[i].price;
    }
  }
 }

 getTotalPrice() {
  let i = 0;
  let total = 0;
  for (i; i < this.selectedOffersList.length; i++) {
    total += this.getOfferPrice(this.selectedOffersList[i].idoffer) * this.selectedOffersList[i].amount;
    }
    return total;
  } */
 }

