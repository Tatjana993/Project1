import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.page.html',
  styleUrls: ['./selected.page.scss'],
})
export class SelectedPage implements OnInit {

  constructor(private nav: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

}
