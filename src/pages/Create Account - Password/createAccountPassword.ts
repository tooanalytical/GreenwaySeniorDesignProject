import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateAccountBirthdatePage } from '../Create Account - Birthdate/createAccountBirthdate';

@Component({
  selector: 'page-createAccountPassword',
  templateUrl: 'createAccountPassword.html'
})
export class CreateAccountPasswordPage {

  constructor(public navCtrl: NavController) {

  }

  createAccountNext(){
    this.navCtrl.push(CreateAccountBirthdatePage);
  }

}
