import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormFileExampleComponent } from './form-file-example/form-file-example.component';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import {MatAutocompleteModule,
  MatSelectModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatMenuModule,
} from '@angular/material';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { RedirectToLoginDialogComponentComponent } from './redirect-to-login-dialog-component/redirect-to-login-dialog-component.component';



export function tokenGetter() {
return sessionStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsersComponent,
    FormFileExampleComponent,
    HomeComponent,
    OfferComponent,
    OrderDialogComponent,
    RedirectToLoginDialogComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    DeferLoadModule,
     // Auth ...
     JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/users/login']
      }
    })
  ],
  exports: [
  ],
  providers: [
    AuthService,
    AuthGuard,
    HomeComponent,
  ],
  bootstrap: [AppComponent],
 entryComponents: [OrderDialogComponent, RedirectToLoginDialogComponentComponent]
})
export class AppModule { }
