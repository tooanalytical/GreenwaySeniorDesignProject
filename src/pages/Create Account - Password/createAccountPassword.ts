import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { CreateAccountBirthdatePage } from '../Create Account - Birthdate/createAccountBirthdate';

@Component({
  selector: 'page-createAccountPassword',
  templateUrl: 'createAccountPassword.html'
})
export class CreateAccountPasswordPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');
  emailAddress = this.navParams.get('emailAddress');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: this.emailAddress,
    userPassword: '',
    userPasswordConfirm: ''
  };

  createAccountNext() {
    this.navCtrl.push(CreateAccountBirthdatePage, this.data);
  }
}
