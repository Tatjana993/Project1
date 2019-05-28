import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectToLoginDialogComponentComponent } from './redirect-to-login-dialog-component.component';

const routes: Routes = [
  {
    path: '',
    component: RedirectToLoginDialogComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectToLoginDialogComponentRoutingModule { }
