import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { CreateAccountPasswordPage } from '../Create Account - Password/createAccountPassword';

@Component({
  selector: 'page-createAccountEmail',
  templateUrl: 'createAccountEmail.html'
})
export class CreateAccountEmailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: ''
  };

  createAccountNext() {
    this.navCtrl.push(CreateAccountPasswordPage, this.data);
  }
}
