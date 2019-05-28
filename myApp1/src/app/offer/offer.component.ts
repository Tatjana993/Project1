import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from '../model/offer/offer.model';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { SelectedOffer } from '../model/selectedOffer/selectedoffer.model';
import { SideDish } from '../model/sidedish/sidedish.model';
import { HomeComponent } from '../home/home.component';
import { OfferlistService } from '../offerlist.service';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  id: number;
  offer: Offer;
  offers: Array<Offer> = [];
  filteredOffers: Array<Offer> = [];
  _searchTerm: string;
  lengthOfOffers = [];
  amoutn: number;
  instructions: string;
  selectedsidedishes: Array<SideDish> = [];
  selectedOffers: Array<SelectedOffer> = [];
  restaurantName: string;
  nameimg: string;
  currentUser = sessionStorage.getItem('iduser');
  currentUserName = sessionStorage.getItem('username');

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    console.log('5555555555555555555555555 set');
    this._searchTerm = value;
    this.filteredOffers = this.filtereOffers(value);
  }

  filtereOffers(searchString: string) {
    return this.offers.filter(offer =>
    offer.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get selected() {
    return this.selectedOffers;
  }

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService, public dialog: MatDialog,
   private home: HomeComponent, private offerlistservice: OfferlistService, private router: Router) {
    this.route.params.subscribe( params => {this.id = params.id; });
  }

  ngOnInit() {
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
    console.log(sessionStorage.getItem('sessionstorage'));
    console.log(localStorage.getItem('localstorage'));
    this.nameimg = 'burrito-chicken.jpg';
    this.restaurantService.getOffer(this.id).subscribe((data: Array<Offer>) => { this.offers = data;
      this.filteredOffers = this.offers;
    });

    this.restaurantService.getRestaurant(this.id).subscribe((data: JSON) => {
      this.restaurantName = data[0].name;  console.log(data); } );
      window.scrollTo(0, 0);
  }

  openDialog(idoffer: number): void {
    console.log('IDOFFER ', idoffer);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';

    dialogConfig.data = {instructions: this.instructions, amount: this.amoutn, sidedishes: this.selectedsidedishes, idoffer: idoffer};
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(OrderDialogComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    if (result === undefined) {
      dialogRef.close();
    } else {
     // console.log('kkkkkkkkk');
    if ( result['amount'] !== null && Number(result['amount']) > 0 ) {
      console.log('bla bla bla');
      console.log(result['sidedishIndex']);
      const sidedishIndex = result['sidedishIndex'];
      let sidedishIndexToString = '';
      for (let i = 0; i < sidedishIndex.length; i++) {
        sidedishIndexToString += sidedishIndex[i] + ',';
      }
   /*  const store = idoffer + '#' + Number(localStorage.getItem('iduser')) + '#' + Number(result['amount']) +
       '#' + sidedishIndexToString + '#' + result['instructions'] + ' ';
      if (localStorage.getItem('selectedOffer') !== null && localStorage.getItem('selectedOffer') !== ' ') {
        let temp = 0;
        let currentlyAtLocalStorage = localStorage.getItem('selectedOffer');
        const selectedOffers = localStorage.getItem('selectedOffer').split(' ');
        let i = 0; */
        const store = idoffer + '#' + Number(sessionStorage.getItem('iduser')) + '#' + Number(result['amount']) +
       '#' + sidedishIndexToString + '#' + result['instructions'] + ' ';
      if (sessionStorage.getItem('selectedOffer') !== null && sessionStorage.getItem('selectedOffer') !== ' ') {
        let temp = 0;
        let currentlyAtLocalStorage = sessionStorage.getItem('selectedOffer');
        const selectedOffers = sessionStorage.getItem('selectedOffer').split(' ');
        let i = 0;
        // let editSelectedOffer = '';

        for (i; i < selectedOffers.length - 1; i++) {
          // console.log(selectedOffers[i].split('#'));
           const idofferSelected = Number(selectedOffers[i].split('#')[0]);
           if (idoffer === idofferSelected) {
             temp = 1;
           }
        }
          console.log('44444444444444444444444444444444444');
          console.log(currentlyAtLocalStorage);
          console.log(store);
          currentlyAtLocalStorage += store;
          sessionStorage.removeItem('selectedOffer');
          sessionStorage.setItem('selectedOffer', currentlyAtLocalStorage);
      //  }
      } else {
        sessionStorage.setItem('selectedOffer', store);
      }
     this.offerlistservice.loadFromLocalstore();
    }
  }
  });


}

logout() {
  this.home.logout();
}
myhome() {
  this.router.navigate(['']);
}
}
