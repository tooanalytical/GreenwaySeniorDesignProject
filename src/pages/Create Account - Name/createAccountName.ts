import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateAccountEmailPage } from '../Create Account - Email/createAccountEmail';

@Component({
  selector: 'page-createAccountName',
  templateUrl: 'createAccountName.html'
})
export class CreateAccountNamePage {
firstName;
lastName;
  constructor(public navCtrl: NavController) {

  }

  createAccountNext(firstName, lastName){
    this.navCtrl.push(CreateAccountEmailPage, firstName, lastName);
  }

}
