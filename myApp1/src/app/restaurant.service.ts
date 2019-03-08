import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurant } from './model/restaurant/restaurant.model';
import { Offer } from './model/offer/offer.model';
import { SelectedOffer } from './model/selectedOffer/selectedoffer.model';
import { SideDish } from './model/sidedish/sidedish.model';
import { SelectedofferJoinOffer } from './model/selectedofferjoinoffer/SelectedofferJoinOffer';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) { }

  public getRestaurants() {
    return this.httpClient.get<Restaurant[]>('http://localhost:5000/restaurants/restaurants');
  }

  public getRestaurant(id: number) {
    return this.httpClient.get('http://localhost:5000/restaurants/restaurant/' + id);
  }

  public getOffer(id: number) {
    return this.httpClient.get('http://localhost:5000/restaurants/offer/' + id);
  }

  public createOrder(toOrder) {
    const t = localStorage.getItem('access_token');
    console.log('55555555 narucivanje hrane ' + toOrder);
    this.headers = new HttpHeaders({'authorization': 'Bearer ' + t});
   // const orederToSent = {o: selectedOffersList};
     return this.httpClient.post('http://localhost:5000/restaurants/offer/order', toOrder, {headers: this.headers});
  }

  public getOffersWhereUserId(id: number) {
    return this.httpClient.get<Array<Array<JSON>>>('http://localhost:5000/restaurants/nova/' + id);
  }

  public getOffersWhereUserIdOrderId(id: number) {
    return this.httpClient.get<Array<Number>>('http://localhost:5000/restaurants/orderswhereuser/' + id);
  }

  public getOfferById(idoffer: number) {
    return this.httpClient.get<Offer>('http://localhost:5000/restaurants/offerwithid/' + idoffer);
  }

  public getSideDishes() {
    return this.httpClient.get<SideDish[]>('http://localhost:5000/restaurants/sidedish');
  }

  public getSelectedSidedishes(idSelectedOffer: number) {
    return this.httpClient.get<Array<String>>('http://localhost:5000/restaurants/selectedsidedishes/' + idSelectedOffer);
  }
}
