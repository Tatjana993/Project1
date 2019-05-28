import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersDetailsRoutingModule } from './users-details-routing.module';
import { UsersComponent } from '../users/users.component';
import { UsersDetailsComponent } from './users-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule,
  MatDialogModule, MatSelectModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [UsersDetailsComponent],
  imports: [
    CommonModule,
    UsersDetailsRoutingModule,

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
export class UsersDetailsModule { }
