import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { CreateAccountEmailPage } from '../Create Account - Email/createAccountEmail';

@Component({
  selector: 'page-createAccountName',
  templateUrl: 'createAccountName.html'
})
export class CreateAccountNamePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {}

  data = {
    firstName: '',
    lastName: ''
  };

  //Validates the user's name fits acceptable parameters
  nameValidation() {
    var flag;

    //Validates first and last name name is not empty and contains only letters
    if(this.data.firstName !== '' && this.data.lastName !== '' && /^[a-zA-Z]+$/.test(this.data.firstName) && /^[a-zA-Z]+$/.test(this.data.lastName)){
      flag = true;
    //Sets flag to false if it fails the validation test.
    } else {
      flag = false;
    }
    return flag;
  }

  //Presents a modal alert to the user if they violate name parameters.
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uh oh!',
      subTitle: 'Please make sure your name is not blank and only contains letters.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Segues user to next step in process if they pass validation requirements.
  createAccountNext(data) {
    if(this.nameValidation()) {
      this.navCtrl.push(CreateAccountEmailPage, data);
    } else {
      this.presentAlert();
    }
    
  }

  
}
