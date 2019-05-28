import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule,
  MatDialogModule, MatSelectModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    CommonModule,
    MyOrdersRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
  ]
})
export class MyOrdersModule { }
