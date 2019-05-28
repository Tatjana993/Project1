import { EsqueceuSenhaPage } from './../esqueceu-senha/esqueceu-senha.page';
import { Component, OnInit } from '@angular/core';
import { Offer } from '../model/offer/offer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../restaurants.service';
import { HomePage } from '../home/home.page';
import { ModalController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
// import { OfferModalPage } from './../offer-modal/offer-modal.page';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  id: number;
  offer: Offer;
  offers: Array<Offer> = [];
  filteredOffers: Array<Offer> = [];
  _searchTerm: string;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantsService,
     private modalController: ModalController, private router: Router) {
     this.route.params.subscribe( params => {this.id = params.id; });
     console.log('PAGE CONSTR');
    }

  ngOnInit() {
    this.restaurantService.getOffer(this.id).subscribe((data: Array<Offer>) => { this.offers = data;
     this.filteredOffers = this.offers;
    });
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredOffers = this.filtereOffers(value);
  }

  filtereOffers(searchString: string) {
    return this.offers.filter(offer =>
    offer.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

   presentModal(idOffer: number) {
    this.restaurantService.currentIdRestaurant = this.id;
    this.restaurantService.currentIdOffer = idOffer;
  this.router.navigate(['/offer-modal']);
   /* const modal = await this.modalController.create({
        component: EsqueceuSenhaPage
    });

    await modal.present(); */
  }

  presentMyBasket() {
    this.restaurantService.currentIdRestaurant = this.id;
    this.router.navigate(['/basket-card']);
  }

  back() {
    this.router.navigate(['./restaurants']);
  }

  redirectToHome() {
    this.router.navigate(['./restaurants']);
  }
  }


