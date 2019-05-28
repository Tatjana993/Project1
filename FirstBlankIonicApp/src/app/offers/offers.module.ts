import { EsqueceuSenhaPage } from './../esqueceu-senha/esqueceu-senha.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OffersPage } from './offers.page';
// import { OfferModalModule } from '../offer-modal/offer-modal.module';
// import { OfferModalPage } from '../offer-modal/offer-modal.page';
// import { OfferModalPage } from './../offer-modal/offer-modal.page';


const routes: Routes = [
  {
    path: '',
    component: OffersPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   // OfferModalModule,
   // OfferModalPage,
    RouterModule.forChild(routes)
  ],
  declarations: [OffersPage, EsqueceuSenhaPage],
  entryComponents: [EsqueceuSenhaPage]
})
export class OffersPageModule {}
