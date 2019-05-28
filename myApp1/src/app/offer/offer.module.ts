import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule,
  MatDialogModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    CommonModule,
    OfferRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
  //  SidebarComponent,
  ]
})
export class OfferModule { }
