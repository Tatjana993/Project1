import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { SideDish } from '../model/sidedish/sidedish.model';
import { RestaurantService } from '../restaurant.service';
import { Offer } from '../model/offer/offer.model';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  form: FormGroup;
  address: string;
  amount: number;
  instructions: string;
  checkbox = false;
  sidedishes: Array<SideDish> = [];
  selectedsidedishes: Array<SideDish> = [];
  sidedishIndex = [];
  index = [];
  controlNameSD: Array<string> = [];
  checked: false;
  selectedOffer: Offer;
  selectedOfferName: string;

  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, private formBuilder: FormBuilder, private restaurantService: RestaurantService) {
    }

  ngOnInit() {
    console.log('788888878787878787878787878--///-/-/-/-/-/-/-/-/-/-/-/-/-/');
    console.log(this.data['idoffer']);
    this.restaurantService.getSideDishes().subscribe(( data: Array<SideDish> ) => {this.sidedishes = data;
      this.index  = new Array<number>(this.sidedishes.length);
      for (let i = 0; i < this.sidedishes.length; i++) {
      this.index[i] = i;
      this.controlNameSD[i] = this.sidedishes[i].name;
    }
    });

    this.restaurantService.getOfferById(Number(this.data['idoffer'])).subscribe((data: Offer) => {this.selectedOffer = data[0];
       console.log(this.selectedOffer.name);
       this.selectedOfferName = data[0].name;
      });
    this.form = this.formBuilder.group({
      instructions: [this.instructions, []],
      amount: [this.amount, []],
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

  save() {
    console.log(this.selectedsidedishes);
    console.log(this.form.value);
    if (this.instructions === undefined) {
      this.instructions = '';
    }
    const obj = {address: this.amount};
    console.log(this.form.value.sidedishes);
    this.dialogRef.close(this.form.value);
}

  close() {
    this.dialogRef.close();
}

onCheckboxChagen(event, value) {

  if (event.target.checked) {

    this.selectedsidedishes.push(value.name);
    this.sidedishIndex.push(value.idsidedish);
    console.log('promjena vrijednostiiiiiiiiiii');
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

}
