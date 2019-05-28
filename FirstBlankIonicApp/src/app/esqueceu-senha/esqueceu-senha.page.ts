import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.page.html',
  styleUrls: ['./esqueceu-senha.page.scss'],
})
export class EsqueceuSenhaPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log('onInit');
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
