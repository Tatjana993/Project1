import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// import { OfferComponent } from './offer/offer.component';
import { HomePage } from './home/home.page';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
// import { OfferModalPage } from './offer-modal/offer-modal.page';
import { DeferLoadModule } from '@trademe/ng-defer-load';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, DeferLoadModule],
  providers: [
    HomePage,
    AuthService,
    AuthGuard,
    StatusBar,
    SplashScreen,
    // NavParams,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
