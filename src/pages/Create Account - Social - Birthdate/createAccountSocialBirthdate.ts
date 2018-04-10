import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CreateAccountSocialPhysicalPage } from '../Create Account - Social - Physical Data/createAccountSocialPhysical';
import { SplashPage } from '../Splash/splash';

@Component({
  selector: 'page-createAccountSocialBirthdate',
  templateUrl: 'createAccountSocialBirthdate.html'
})
export class CreateAccountSocialBirthdatePage {
  birthDate: String = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {}

  minimumAge = 4745;

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');
  emailAddress = this.navParams.get('emailAddress');
  userAvatar = this.navParams.get('userAvatar');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: this.emailAddress,
    userAvatar: this.userAvatar,
    userBirthdate: ''
  };

  blankFlag = false;
  ageFlag = false;

  flag = false;

  //Validates the user's birthdate fits acceptable parameters
  birthdayValidation(data) {
    this.blankFlag = false;
    this.ageFlag = false;

    this.flag = false;

    if (this.data.userBirthdate == '') {
      this.blankFlag = true;
      return;
    } else if (this.daysBetween() < this.minimumAge) {
      this.ageFlag = true;
      return;
    }
    return this.flag;
  }

  //Calculates user age in days and returns.
  daysBetween() {
    var birthdate = new Date(this.data.userBirthdate);
    var today = new Date();

    var timeDiff = Math.abs(today.getTime() - birthdate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }

  //Presents a modal alert to the user if they don't enter their birthdate.
  presentAlertBlankBirthdate() {
    let alert = this.alertCtrl.create({
      title: 'Uh oh!',
      subTitle: 'Please enter your birthdate.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents an alert if the user is under the age of 13.
  presentAlertAgeRestriction() {
    let alert = this.alertCtrl.create({
      title: 'Uh oh!',
      subTitle: 'You must be older than 13 years old to use Viridian.',
      buttons: ['Ok']
    });
    alert.present();
  }

  startOver() {
    this.navCtrl.setRoot(SplashPage);
  }

  //Segues user to next step in process if they pass validation requirements.
  createAccountNext() {
    this.birthdayValidation(this.data);
    if (this.blankFlag) {
      this.presentAlertBlankBirthdate();
    } else if (this.ageFlag) {
      this.presentAlertAgeRestriction();
    } else {
      this.navCtrl.push(CreateAccountSocialPhysicalPage, this.data);
    }
  }
}
