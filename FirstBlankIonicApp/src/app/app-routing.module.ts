import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
// import { OfferComponent } from './offer/offer.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
 // { path: 'offer/:id', component: OfferComponent},
  { path: 'offers', canActivate: [AuthGuard], loadChildren: './offers/offers.module#OffersPageModule' },
  { path: 'offers/:id', canActivate: [AuthGuard], loadChildren: './offers/offers.module#OffersPageModule' },
  { path: 'offer-modal', canActivate: [AuthGuard], loadChildren: './offer-modal/offer-modal.module#OfferModalModule' },
  { path: 'esqueceu-senha', loadChildren: './esqueceu-senha/esqueceu-senha.module#EsqueceuSenhaPageModule' },
  { path: 'basket-card', canActivate: [AuthGuard], loadChildren: './basket-card/basket-card.module#BasketCardPageModule' },
  { path: 'restaurants', canActivate: [AuthGuard], loadChildren: './restaurants/restaurants.module#RestaurantsPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
