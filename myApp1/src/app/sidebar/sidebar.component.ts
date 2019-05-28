import { Component, OnInit } from '@angular/core';
import { Offer } from '../model/offer/offer.model';
import { SelectedOffer } from '../model/selectedOffer/selectedoffer.model';
import { RestaurantService } from '../restaurant.service';
import { OfferlistService } from '../offerlist.service';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Order } from '../model/order/order.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  orderList: Array<Offer> = [];
  selectedOffersList: Array<SelectedOffer> = [];
  fleg = this.selectedOffersList.length > 0;
  showSucessMessage: boolean;
  tokenInvalid: boolean;
  oderForm: FormGroup;
  order: Order = {
    idorder: 0,
    address: ''
  };

  constructor(private offerlistservice: OfferlistService, private formBuilder: FormBuilder,
    private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.oderForm = this.formBuilder.group({
      address: ['', Validators.required]
    });

    console.log('shhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaaaaaalalalalallaal');
    console.log(this.selectedOffersList);
    const toReturn =  this.offerlistservice.loadFromLocalstore();
    console.log(toReturn);
    if (toReturn['orderList'].length !== this.orderList.length ) {}
    this.orderList = toReturn['orderList'];
    this.selectedOffersList = toReturn['selectedOfferList'];
  }

  getName(idoffer: number) {
    return this.offerlistservice.getName(idoffer);
  }

  getOfferPrice(idoffer: number) {
   return this.offerlistservice.getOfferPrice(idoffer);
  }

  editSelectedOffer(offer: Offer) {
  //  const selectedOffers = localStorage.getItem('selectedOffer').split(' ');
  const selectedOffers = sessionStorage.getItem('selectedOffer').split(' ');
    let editSelectedOffer = '';
   // let editedOffer = '';
   console.log('***********************************');
   console.log(sessionStorage.getItem('selectedOffer'));
    let i = 0;
    for (i; i < selectedOffers.length - 1; i++) {
    // console.log(selectedOffers[i].split('#'));
     const idoffer = Number(selectedOffers[i].split('#')[0]);
     if (idoffer === offer.idoffer) {
       const iduser = Number(selectedOffers[i].split('#')[1]);
       let amount = Number(selectedOffers[i].split('#')[2]);
       const sidedish = selectedOffers[i].split('#')[3];
       const instruction = selectedOffers[i].split('#')[4];
       if (amount > 1) {
         amount = amount - 1;
         editSelectedOffer += idoffer + '#' + iduser + '#' + amount + '#' + sidedish + '#' + instruction + ' ';
       }
     } else {
       editSelectedOffer += selectedOffers[i] + ' ';
     }
    }
   sessionStorage.removeItem('selectedOffer');
   sessionStorage.setItem('selectedOffer', editSelectedOffer);
    console.log('***********************************');
   console.log(sessionStorage.getItem('selectedOffer'));
    console.log('44444 ' + this.selectedOffersList);
   for (i = 0; i < this.selectedOffersList.length; i++) {
     if (this.selectedOffersList[i].idoffer === offer.idoffer) {
       console.log(' ' + this.selectedOffersList[i].amount);
       this.selectedOffersList[i].amount = this.selectedOffersList[i].amount - 1;
       if (this.selectedOffersList[i].amount === 0) {
         for (let y = 0; y < this.orderList.length; y++) {
           if (this.orderList[y].idoffer === this.selectedOffersList[i].idoffer) {
             this.orderList.splice(y, 1);
           }
         }
         this.selectedOffersList.splice(i, 1);
       }
       console.log('5555 ' + this.selectedOffersList);
       break;
     }
   }
  }
  addSelectedOffer(offer: Offer) {
   // const selectedOffers = localStorage.getItem('selectedOffer').split(' ');
   const selectedOffers = sessionStorage.getItem('selectedOffer').split(' ');
   let editSelectedOffer = '';
  // let editedOffer = '';
  console.log('***********************************');
  console.log(sessionStorage.getItem('selectedOffer'));
   let i = 0;
   for (i; i < selectedOffers.length - 1; i++) {
   // console.log(selectedOffers[i].split('#'));
    const idoffer = Number(selectedOffers[i].split('#')[0]);
    if (idoffer === offer.idoffer) {
      const iduser = Number(selectedOffers[i].split('#')[1]);
      let amount = Number(selectedOffers[i].split('#')[2]);
      const sidedish = selectedOffers[i].split('#')[3];
      const instruction = selectedOffers[i].split('#')[4];
      if (amount + 1 <= 10) {
        amount = amount + 1;
        editSelectedOffer += idoffer + '#' + iduser + '#' + amount + '#' + sidedish + '#' + instruction + ' ';
      } else {
        editSelectedOffer += selectedOffers[i] + ' ';
      }
    } else {
      editSelectedOffer += selectedOffers[i] + ' ';
    }
   }
  sessionStorage.removeItem('selectedOffer');
  sessionStorage.setItem('selectedOffer', editSelectedOffer);
  console.log('***********************************');
 console.log(sessionStorage.getItem('selectedOffer'));

  console.log('44444 ' + this.selectedOffersList);
  for (i = 0; i < this.selectedOffersList.length; i++) {
    if (this.selectedOffersList[i].idoffer === offer.idoffer) {
      console.log(' ' + this.selectedOffersList[i].amount);
      if (this.selectedOffersList[i].amount + 1 <= 10) {
      this.selectedOffersList[i].amount = this.selectedOffersList[i].amount + 1;
      }
      console.log('5555 ' + this.selectedOffersList);
      break;
    }
  }
  }

  onSubmit(form: NgForm) {

    console.log('on Submit() ' + this.order.address);
  //  if (localStorage.getItem('selectedOffer') !== null) {
    if (sessionStorage.getItem('selectedOffer') !== null) {
        console.log(this.selectedOffersList);
      const toOrder = {selectedOfferList: this.selectedOffersList, address: this.order.address};
      console.log(toOrder);
     // localStorage.removeItem('selectedOffer');
     sessionStorage.removeItem('selectedOffer');
      this.restaurantService.createOrder(toOrder)
      .subscribe((data: JSON) => { console.log(data);
      if (data['status'] === 'ok') {
        this.removeAll();
        this.showSucessMessage = true;
        this.tokenInvalid = false;
      } else {
        this.tokenInvalid = true;
        this.showSucessMessage = false;
      } this.formReset(form); });
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

 getTotalPrice() {
  let i = 0;
  let total = 0;
  for (i; i < this.selectedOffersList.length; i++) {
    total += this.getOfferPrice(this.selectedOffersList[i].idoffer) * this.selectedOffersList[i].amount;
    }
    return  Math.round(total);
  }

  removeAll() {
    this.selectedOffersList.splice(0, this.selectedOffersList.length);
  }

}
