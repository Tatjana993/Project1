import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { RedirectToLoginDialogComponentComponent } from './redirect-to-login-dialog-component/redirect-to-login-dialog-component.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public dialog: MatDialog) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url === '/registration' && localStorage.getItem('access_token')) {
      console.log(localStorage.getItem('access_token'));
      this.router.navigate(['']);
      return false;
    } else if (state.url === '/registration' && localStorage.getItem('access_token') === null) {
      return true;
    } else {
        if (localStorage.getItem('access_token')) {
          return true;
        }

        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '400px';
        dialogConfig.disableClose = true;
        const dialogRef = this.dialog.open(RedirectToLoginDialogComponentComponent, dialogConfig);
        this.router.navigate(['']);
        return false;
      }
  }

  canActivateCustom(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['']);
      return false;
    }
  }
}
