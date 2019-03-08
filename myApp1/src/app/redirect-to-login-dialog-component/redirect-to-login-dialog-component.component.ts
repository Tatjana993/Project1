import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-redirect-to-login-dialog-component',
  templateUrl: './redirect-to-login-dialog-component.component.html',
  styleUrls: ['./redirect-to-login-dialog-component.component.css']
})
export class RedirectToLoginDialogComponentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RedirectToLoginDialogComponentComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
    this.dialogRef.close();
  }
}
