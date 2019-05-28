import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OfferModalPage } from './offer-modal.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OfferModalPage],
  // entryComponents: [OfferModalPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: OfferModalPage
      }
    ])
  ]
})
export class OfferModalModule { }
