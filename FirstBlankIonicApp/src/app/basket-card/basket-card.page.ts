import { Component, OnInit } from '@angular/core';
import { SelectedOffer } from '../model/selectedOffer/selectedoffer.model';
import { Offer } from '../model/offer/offer.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Order } from '../model/order/order.model';
import { RestaurantsService } from '../restaurants.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket-card',
  templateUrl: './basket-card.page.html',
  styleUrls: ['./basket-card.page.scss'],
})
export class BasketCardPage implements OnInit {

  orderList: Array<Offer> = [];
  selectedOffersList: Array<SelectedOffer> = [];
  fleg = this.selectedOffersList.length > 0;
  showSucessMessage: boolean;
  tokenInvalid: boolean;
  oderForm: FormGroup;
  submitted: boolean;
  invalidLogin: boolean;
  serverMessages: String;
  order: Order = {
    idorder: 0,
    address: ''
  };
  offer: Offer;
  toreturn: string;

  constructor(private restaurantService: RestaurantsService,
    private formBuilder: FormBuilder, public alertController: AlertController,
    private router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.oderForm = this.formBuilder.group({
      address: ['', Validators.required]
    });
    this.toreturn = '/offers/' + this.restaurantService.currentIdRestaurant;
    this.removeAll();
    if (sessionStorage.getItem('selectedOffer') !== null && sessionStorage.getItem('selectedOffer') !== ' ') {
      console.log(sessionStorage.getItem('selectedOffer'));
      if (sessionStorage.getItem('selectedOffer') === ' ') {
       // console.log('odje smooooooooooooooooooooooooooooooooooooooooooooooo');
      }
      this.fleg = true;
      const selectedOffersToSplit = sessionStorage.getItem('selectedOffer').split(' ');
      let i = 0;
    //  console.log(selectedOffersToSplit.length);
      for (i; i < selectedOffersToSplit.length - 1; i++) {
     //   console.log(selectedOffersToSplit[i].split('#'));
        const idoffer = Number(selectedOffersToSplit[i].split('#')[0]);
        const iduser = Number(selectedOffersToSplit[i].split('#')[1]);
        const amount = Number(selectedOffersToSplit[i].split('#')[2]);
        const sd = selectedOffersToSplit[i].split('#')[3].split(',');
        const instruction = selectedOffersToSplit[i].split('#')[4];
        const sidedishes = [];
        for (let y = 0; y < sd.length - 1; y++) {
          sidedishes[y] = Number(sd[y]);
        }
    //    console.log('parsiranoo ' + idoffer + 'amount ' + amount);
        const selectedoffer = new SelectedOffer(idoffer, iduser, amount, sidedishes, instruction);
        this.selectedOffersList.push(selectedoffer);
        this.restaurantService.getOfferById(idoffer)
        .subscribe((data: Offer) => {console.log(data); this.offer = data; this.orderList.push(this.offer[0]);
        //  console.log(this.offer[0].name);  console.log('Array length ' + this.orderList.length);
         });
      }
      const tostring = this.orderList.toString();
 //     console.log('************************** ');
  //    console.log(tostring);
      }
    //  const toReturn = {'orderList': this.orderList, 'selectedOfferList': this.selectedOffersList};

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

  removeAll() {
    this.orderList.splice(0, this.orderList.length);
    this.selectedOffersList.splice(0, this.selectedOffersList.length);
  }

  getTotalPrice() {
    let i = 0;
    let total = 0;
    for (i; i < this.selectedOffersList.length; i++) {
      total += this.getOfferPrice(this.selectedOffersList[i].idoffer) * this.selectedOffersList[i].amount;
      }
      return  this.round(total, 2);
    }

    round(number, precision) {
      const factor = Math.pow(10, precision);
      const tempNumber = number * factor;
      const roundedTempNumber = Math.round(tempNumber);
      return roundedTempNumber / factor;
    }

  editSelectedOffer(offer: Offer) {
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
   // editSelectedOffer += ' ';
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
  // editSelectedOffer += ' ';
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
    if (sessionStorage.getItem('selectedOffer') !== null) {
        console.log(this.selectedOffersList);
      const toOrder = {selectedOfferList: this.selectedOffersList, address: this.order.address};
      console.log(toOrder);
      sessionStorage.removeItem('selectedOffer');
      this.restaurantService.createOrder(toOrder)
      .subscribe((data: JSON) => { console.log(data);
      if (data['status'] === 'ok') {
        this.presentToastWithOptions('Order completed');
        this.removeAll();
        // this.showSucessMessage = true;
        this.tokenInvalid = false;
      } else {
       // this.tokenInvalid = true;
        this.showSucessMessage = false;
        this.presentToastWithOptions('Token is invalid.');
      } this.formReset(form); });
      } else {
        console.log('storage is empty');
      }
 }
 async presentToastWithOptions(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    showCloseButton: true,
    duration: 2000,
    position: 'top',
    closeButtonText: 'Close'
  });
  toast.present();
}
 async presentAlert(msg: string) {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
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

 back() {
  this.router.navigate([this.toreturn]);
}
}
