import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AuthGuard } from './auth.guard';
import { FormFileExampleComponent } from './form-file-example/form-file-example.component';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FirstComponent } from './first/first.component';

const routes: Routes = [
  {
    path: 'user',
    component: UsersComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'users_details/:id',
    component: UsersDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: UserCreateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent
  },
  {
    path: '',
    component: HomeComponent
  },
/*  {
    path: '',
    redirectTo: 'first',
     pathMatch: 'full'
  },
  {
    path: 'first',
    loadChildren: './first/first.module#FirstModule'
  }, */
  {
    path: 'offer/:id',
    component: OfferComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users_details/:id/myorders',
    component: MyOrdersComponent,
   // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
