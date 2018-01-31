import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firstName;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.storage.get('firstName').then(val => {
      this.firstName = val;
    });
  }
}
