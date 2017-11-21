import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { CreateAccountEmailPage } from '../Create Account - Email/createAccountEmail';

@Component({
  selector: 'page-createAccountName',
  templateUrl: 'createAccountName.html'
})
export class CreateAccountNamePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  data = {
    firstName: '',
    lastName: ''
  };

  createAccountNext(data) {
    this.navCtrl.push(CreateAccountEmailPage, data);
  }
}
