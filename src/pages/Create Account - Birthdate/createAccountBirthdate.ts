import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { CreateAccountPhysicalPage } from '../Create Account - Physical Data/createAccountPhysical';

@Component({
  selector: 'page-createAccountBirthdate',
  templateUrl: 'createAccountBirthdate.html'
})
export class CreateAccountBirthdatePage {
  birthDate: String = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');
  emailAddress = this.navParams.get('emailAddress');
  userPassword = this.navParams.get('userPassword');
  userPasswordConfirm = this.navParams.get('userPasswordConfirm');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: this.emailAddress,
    userPassword: this.userPassword,
    userPasswordConfirm: this.userPasswordConfirm,
    userBirthdate: ''
  };

  createAccountNext() {
    this.navCtrl.push(CreateAccountPhysicalPage, this.data);
  }
}
