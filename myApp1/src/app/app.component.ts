import { Component } from '@angular/core';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp1';
  constructor() {
    console.log(isDevMode());
  }
}


