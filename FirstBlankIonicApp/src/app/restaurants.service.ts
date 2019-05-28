import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurant } from './model/restaurant/restaurant.model';
import { SideDish } from './model/sidedish/sidedish.model';
import { Offer } from './model/offer/offer.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  currentIdRestaurant: number;
  currentIdOffer: number;
  private headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) { }

  public getRestaurants() {
    return this.httpClient.get<Array<Restaurant>>('https://localhost:5000/restaurants/restaurants');
  }

  public getOffer(id: number) {
    return this.httpClient.get('https://localhost:5000/restaurants/offer/' + id);
  }

  public getOfferById(idoffer: number) {
    return this.httpClient.get<Offer>('https://localhost:5000/restaurants/offerwithid/' + idoffer);
  }

  public getSideDishes() {
    return this.httpClient.get<SideDish[]>('https://localhost:5000/restaurants/sidedish');
  }

  public createOrder(toOrder) {
    const t = sessionStorage.getItem('access_token');
    console.log('55555555 narucivanje hrane ' + toOrder);
     this.headers = new HttpHeaders({'authorization': 'Bearer ' + t});
   // const orederToSent = {o: selectedOffersList};
     return this.httpClient.post('https://localhost:5000/restaurants/offer/order', toOrder, {headers: this.headers});
  }
}
