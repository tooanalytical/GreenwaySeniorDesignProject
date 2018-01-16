import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { CreateAccountPasswordPage } from '../Create Account - Password/createAccountPassword';

@Component({
  selector: 'page-createAccountEmail',
  templateUrl: 'createAccountEmail.html'
})
export class CreateAccountEmailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {}

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: ''
  };

  //Validates the user's email address fits acceptable parameters
  emailValidation() {
    var flag;

    //Validates the email is not empty and consists of a correct email format.
    if(this.data.emailAddress !== '' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.data.emailAddress)){
      flag = true;
    //Sets flag to false if it fails the validation test.
    } else {
      flag = false;
    }
    return flag;
  }

  //Presents a modal alert to the user if they violate email parameters.
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uh oh!',
      subTitle: 'Please enter a valid email address.',
      buttons: ['Ok']
    });
    alert.present();
  }

  createAccountNext() {
    if(this.emailValidation()) {
      this.navCtrl.push(CreateAccountPasswordPage, this.data);
    } else {
      this.presentAlert();
    }
    
  }
}
