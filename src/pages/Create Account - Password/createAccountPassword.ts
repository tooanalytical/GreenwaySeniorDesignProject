import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { CreateAccountBirthdatePage } from '../Create Account - Birthdate/createAccountBirthdate';

@Component({
  selector: 'page-createAccountPassword',
  templateUrl: 'createAccountPassword.html'
})
export class CreateAccountPasswordPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {}

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

  lengthFlag = false;
  matchFlag = false;
  symbolFlag = false;
  flag = false;

  //Validates the user's password fits acceptable parameters
  passwordValidation() {

    this.lengthFlag = false;
    this.matchFlag = false;
    this.symbolFlag = false;
    this.flag = false;
    //Triggers flag if either password is less than 8 characters.
    if(this.data.userPassword.length < 8 || this.data.userPasswordConfirm.length < 8 ){
      this.lengthFlag = true;
      return;
    //Triggers flag if the passwords don't match.
    } else if (this.data.userPassword !== this.data.userPasswordConfirm){
      this.matchFlag = true;
      return;
    //Triggers flag if the password doesn't include a symbol.
    } else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(this.data.userPassword) == false){
      this.symbolFlag = true;
      return;
    }
    return this.flag;
  }

  //Presents a modal alert to the user if their password is not greater than 8 characters.
  presentAlertLength() {
    let alert = this.alertCtrl.create({
      title: 'Uh oh!',
      subTitle: 'Please make sure your password is 8 or more characters.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents a modal alert to the user if their passwords don't match.
  presentAlertMatch() {
    let alert = this.alertCtrl.create({
      title: 'Uh oh!',
      subTitle: 'Please make sure your passwords match.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents a modal alert to the user if their password doesn't include a symbol.
  presentAlertSymbol() {
    let alert = this.alertCtrl.create({
      title: 'Uh oh!',
      subTitle: 'Please make sure your password includes a symbol.',
      buttons: ['Ok']
    });
    alert.present();
  }

  createAccountNext() {
    this.passwordValidation();
    if(this.lengthFlag) {
      this.presentAlertLength();
    } else if (this.matchFlag){
      this.presentAlertMatch();
    } else if (this.symbolFlag){
      this.presentAlertSymbol();
    } else {
      this.navCtrl.push(CreateAccountBirthdatePage, this.data);
    }
  }
}
