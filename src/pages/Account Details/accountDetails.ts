import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-accountDetails',
  templateUrl: 'accountDetails.html'
})
export class AccountDetailsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    this.getUserInfo();
  }

  userName;
  emailAddress;
  userHeight;
  userWeight;
  userBirthdate;
  userGender;

  getUserInfo() {
    this.storage.get('name').then(val => {
      this.userName = val;
    });
    this.storage.get('email').then(val => {
      this.emailAddress = val;
    });
    this.storage.get('userHeight').then(val => {
      this.userHeight = val;
    });
    this.storage.get('userWeight').then(val => {
      this.userWeight = val;
    });
    this.storage.get('userBirthdate').then(val => {
      this.userBirthdate = val;
    });
    this.storage.get('userGender').then(val => {
      this.userGender = val;
    });
  }
}
