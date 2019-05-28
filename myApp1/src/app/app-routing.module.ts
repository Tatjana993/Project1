import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from './user-create/user-create.component';
// import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AuthGuard } from './auth.guard';
import { FormFileExampleComponent } from './form-file-example/form-file-example.component';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    path: 'user',
    component: UsersComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'users_details/:id',
    loadChildren: './users-details/users-details.module#UsersDetailsModule',
   // component: UsersDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
   // component: LoginComponent
  },
  {
    path: 'registration',
    loadChildren: './user-create/user-create.module#UserCreateModule',
   // component: UserCreateComponent,
    canActivate: [AuthGuard],
  /*  children: [
      {
        path: '',
        component: HomeComponent
      }
    ] */
  },
  {
    path: '',
    component: HomeComponent
  },
 /* {
    path: '',
    redirectTo: 'first',
    pathMatch: 'full'
  },
  { path: 'first', loadChildren: './first/first.module#FirstModule' }, */
  {
    path: 'offer/:id',
   // loadChildren: './offer/offer.module#OfferModule',
    component: OfferComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users_details/:id/myorders',
    loadChildren: './my-orders/my-orders.module#MyOrdersModule',
   // component: MyOrdersComponent,
   // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
