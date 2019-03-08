import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { SelectedofferJoinOffer } from '../model/selectedofferjoinoffer/SelectedofferJoinOffer';
import { ArraySelectedOffers } from '../model/selectedofferjoinoffer/ArraySelectedOffers';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Order } from '../model/order/order.model';
import { SelectedOffer } from '../model/selectedOffer/selectedoffer.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  a: Array<Array<JSON>>;
  arrayIdOrder: Number[] ;
  listOrders: Array<ArraySelectedOffers> = new Array<ArraySelectedOffers>();
  selectedOffersList: Array<SelectedOffer> = [];
  showSucessMessage: boolean;
  tokenInvalid: boolean;
  oderForm: FormGroup;
  submitted: boolean;
  invalidLogin: boolean;
  serverMessages: String;
  ordero: Order = {
    idorder: 0,
    address: ''
  };
  constructor(private restaurantService: RestaurantService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.oderForm = this.formBuilder.group({
      address: ['', Validators.required]
    });

     this.restaurantService.getOffersWhereUserId(Number(localStorage.getItem('iduser'))).subscribe
     ((data: Array<Array<JSON>>) => { this.a = data;
       console.log(this.a);
       for (let i = 0; i < this.a.length; i++) {
        const arrayselectedoffer = new ArraySelectedOffers();
        for (let y = 0; y < this.a[i].length; y++) {
          const selectedOffer = new SelectedofferJoinOffer(Number(this.a[i][y]['idSelectedoffer']), this.a[i][y]['name'],
          Number(this.a[i][y]['amount']), this.a[i][y]['description'], Number(this.a[i][y]['idoffer']), this.a[i][y]['instruction'],
            Number(this.a[i][y]['price']), this.a[i][y]['sidedishes'], this.a[i][y]['restaurantname']);
            arrayselectedoffer.add(selectedOffer);
        }
        this.listOrders.push(arrayselectedoffer);
       }

     /* for (let i = 0; i < this.a.length; i++) {
        // console.log(String(this.a[i]));
        const arrayselectedoffer = new ArraySelectedOffers();
        const strsplit = String(this.a[i]).split(',');
        for (let y = 0; y < strsplit.length; y++) {
          this.restaurantService.getRestaurant(Number(strsplit[y].split(':')[7])).subscribe
           ((rname: JSON) => {
        //  this.getRestaurant(Number(strsplit[y].split(':')[7]), function(rname) {
           // console.log(rname);
           this.restaurantService.getSelectedSidedishes(Number(strsplit[y].split(':')[0])).subscribe
           ((selectedSidedishes: Array<String>) => {
              console.log(selectedSidedishes);
            const description = strsplit[y].split(':')[3].replace(/; /g, ', ');
            const selectedOffer = new SelectedofferJoinOffer(Number(strsplit[y].split(':')[0]), strsplit[y].split(':')[1],
             Number(strsplit[y].split(':')[2]), description, Number(strsplit[y].split(':')[4]), strsplit[y].split(':')[5],
               Number(strsplit[y].split(':')[6]), rname[0].name, selectedSidedishes);
             arrayselectedoffer.add(selectedOffer);
           });
          });
        }
        this.listOrders.push(arrayselectedoffer);
      } */
     });
  }

  onSubmit(form: NgForm, toorder: ArraySelectedOffers) {
    this.selectedOffersList = new Array();
    console.log('on Submit() ' + toorder);
    for (let i = 0; i < toorder.array.length; i++) {
      if (toorder.array[i].instruction === undefined || toorder.array[i].instruction === null) {
        toorder.array[i].instruction = 'null';
      }
      const sel = new SelectedOffer(toorder.array[i].idOffer, Number(localStorage.getItem('iduser')),
       toorder.array[i].amount, [1], toorder.array[i].instruction);
       this.selectedOffersList.push(sel);
    }
      const toOrder = {selectedOfferList: this.selectedOffersList, address: this.ordero.address};
      console.log(toOrder);
      this.restaurantService.createOrder(toOrder)
      .subscribe((data: JSON) => { console.log(data);
      if (data['status'] === 'ok') {
        this.showSucessMessage = true;
        this.tokenInvalid = false;
      } else {
        this.tokenInvalid = true;
        this.showSucessMessage = false;
      } this.formReset(form); });
       window.scrollTo(0, 0);

 }

 formReset(form: NgForm) {
  this.oderForm = this.formBuilder.group({
    address: ['', Validators.required]
  });
  this.ordero = {
    idorder: 0,
    address: ''
  };
 }

 public getRestaurant(idrestaurant: number, cb) {
   this.restaurantService.getRestaurant(idrestaurant).subscribe
   ((data: JSON) => { cb(data[0].name);  });
 }

}
