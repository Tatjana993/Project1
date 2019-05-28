import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestaurantsService } from '../restaurants.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SideDish } from '../model/sidedish/sidedish.model';
import { Offer } from '../model/offer/offer.model';
// import { ViewController } from '@ionic/angular';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.page.html',
  styleUrls: ['./offer-modal.page.scss'],
})
export class OfferModalPage implements OnInit {

  idoffer: number;
  idrestaurnat: number;
  toreturn: string;
  form: FormGroup;
  amount: number;
  instructions: string;

  sidedishes: Array<SideDish> = [];
  selectedsidedishes: Array<SideDish> = [];
  sidedishIndex = [];
  index = [];
  controlNameSD: Array<string> = [];
  checkbox = false;

  selectedOffer: Offer;
  selectedOfferName: string;

  constructor(private modalController: ModalController, private router: Router, private restaurantService: RestaurantsService,
    private formBuilder: FormBuilder, public toastController: ToastController) {
      this.idoffer = this.restaurantService.currentIdOffer;
      console.log(this.idoffer);
      this.toreturn = '/offers/' + this.restaurantService.currentIdRestaurant;

      this.restaurantService.getSideDishes().subscribe(( data: Array<SideDish> ) => {this.sidedishes = data;
        this.index  = new Array<number>(this.sidedishes.length);
        for (let i = 0; i < this.sidedishes.length; i++) {
        this.index[i] = i;
        this.controlNameSD[i] = this.sidedishes[i].name;
      }
    });
    this.restaurantService.getOfferById(this.idoffer).subscribe((data: Offer) => {
      // console.log(data);
      this.selectedOffer = data[0];
      this.selectedOfferName = data[0].name;
     });

  this.form = this.formBuilder.group({
    amount: [this.amount, []],
    instructions: [this.instructions, []],
    sidedishes: [this.sidedishes, []],
      checkbox: [this.checkbox, []],
      'Ketchup': [this.controlNameSD[0], []],
      'Mayonnaise': [this.controlNameSD[1], []],
      'Mustard': [this.controlNameSD[2], []],
      'Onion': [this.controlNameSD[3], []],
      'Tartar sauce': [this.controlNameSD[4], []],
      'Sour salat': [this.controlNameSD[5], []],
      'English salad': [this.controlNameSD[6], []],
      'Russian salad': [this.controlNameSD[7], []],
      'Spicy salad': [this.controlNameSD[8], []],
      'Sour cream': [this.controlNameSD[9], []],
      'Without additional': [this.controlNameSD[10], []],
      sidedishIndex: [this.sidedishIndex, []],
  });
  }

  ngOnInit() {
  }

  dismiss() {
    console.log('toreturn', this.toreturn);
    this.router.navigate([this.toreturn]);
  }

  save() {
    if (this.form.value.amount !== null && Number(this.form.value.amount) > 0) {
      if (this.form.value.instructions === null) {
        this.form.value.instructions = 'null';
      }
      console.log(this.form.value.amount);
      const sidedishIndex = this.form.value.sidedishIndex;
      let sidedishIndexToString = '';
      for (let i = 0; i < sidedishIndex.length; i++) {
        sidedishIndexToString += sidedishIndex[i] + ',';
      }

      const store = this.idoffer + '#' + 43 + '#' + Number(this.form.value.amount) +
       '#' + sidedishIndexToString + '#' + this.form.value.instructions + ' ';

    if (sessionStorage.getItem('selectedOffer') !== null && sessionStorage.getItem('selectedOffer') !== ' ') {
      let temp = 0;
      let currentlyAtLocalStorage = sessionStorage.getItem('selectedOffer');
      const selectedOffers = sessionStorage.getItem('selectedOffer').split(' ');
      let i = 0;
      for (i; i < selectedOffers.length - 1; i++) {
        // console.log(selectedOffers[i].split('#'));
         const idofferSelected = Number(selectedOffers[i].split('#')[0]);
         if (this.idoffer === idofferSelected) {
           temp = 1;
         }
      }

      //  console.log('44444444444444444444444444444444444');
        console.log(currentlyAtLocalStorage);
        console.log(store);
        currentlyAtLocalStorage += store;
        sessionStorage.removeItem('selectedOffer');
        sessionStorage.setItem('selectedOffer', currentlyAtLocalStorage);
    //  }
    } else {
      sessionStorage.setItem('selectedOffer', store);
    }
    this.presentToastWithOptions('Offer is added in basket card');
  } else {
    this.presentToastWithOptions('Nothing chosen');
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

  onCheckboxChagen(event, value) {
    if (event.target.checked) {
      this.selectedsidedishes.push(value.name);
      this.sidedishIndex.push(value.idsidedish);
    //  console.log('promjena vrijednostiiiiiiiiiii');
      console.log(this.selectedsidedishes);
    }
    if (!event.target.checked) {
      const ie = this.selectedsidedishes.indexOf(value.name);
      if (ie > -1) {
        this.selectedsidedishes.splice(ie, 1);
        this.sidedishIndex.splice(ie, 1);
      }
    }
  }

  presentMyBasket() {
    this.router.navigate(['/basket-card']);
  }

  back() {
    this.router.navigate([this.toreturn]);
  }

  redirectToHome() {
    this.router.navigate(['./restaurants']);
  }

}
