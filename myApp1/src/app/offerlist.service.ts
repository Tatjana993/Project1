import { Injectable } from '@angular/core';
import { Offer } from './model/offer/offer.model';
import { SelectedOffer } from './model/selectedOffer/selectedoffer.model';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class OfferlistService {

  orderList: Array<Offer> = [];
  selectedOffersList: Array<SelectedOffer> = [];
  orderListToString: string;
  offer: Offer;
  fleg = false;
  constructor(private restaurantService: RestaurantService) { }

  public loadFromLocalstore() {
    this.removeAll();
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
        const instruction = selectedOffersToSplit[i].split('#')[4];
        const sidedishes = [];
        for (let y = 0; y < sd.length - 1; y++) {
          sidedishes[y] = Number(sd[y]);
        }
        console.log('parsiranoo ' + idoffer + 'amount ' + amount);
        const selectedoffer = new SelectedOffer(idoffer, iduser, amount, sidedishes, instruction);
        this.selectedOffersList.push(selectedoffer);
        this.restaurantService.getOfferById(idoffer)
        .subscribe((data: Offer) => {console.log(data); this.offer = data; this.orderList.push(this.offer[0]);
          console.log(this.offer[0].name);  console.log('Array length ' + this.orderList.length); });
      }
      const tostring = this.orderList.toString();
      console.log('************************** ');
      console.log(tostring);
      }
      const toReturn = {'orderList': this.orderList, 'selectedOfferList': this.selectedOffersList};
      return toReturn;
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

}

