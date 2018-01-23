import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { CreateAccountFinishPage } from '../Create Account - Finish/createAccountFinish';

@Component({
  selector: 'page-createAccountPhysical',
  templateUrl: 'createAccountPhysical.html'
})
export class CreateAccountPhysicalPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');
  emailAddress = this.navParams.get('emailAddress');
  userPassword = this.navParams.get('userPassword');
  userPasswordConfirm = this.navParams.get('userPasswordConfirm');
  userBirthdate = this.navParams.get('userBirthdate');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: this.emailAddress,
    userPassword: this.userPassword,
    userPasswordConfirm: this.userPasswordConfirm,
    userBirthdate: this.userBirthdate,
    userHeight: '',
    userWeight: ''
  };

  createAccountNext() {
    this.navCtrl.push(CreateAccountFinishPage, this.data);
  }
}
