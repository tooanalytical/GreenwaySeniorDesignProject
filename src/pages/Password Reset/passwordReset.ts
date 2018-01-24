import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-passwordReset',
  templateUrl: 'passwordReset.html'
})
export class PasswordResetPage {
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {}

  data = {
    emailAddress: ''
  };

  //Validates the user's email address fits acceptable parameters
  emailValidation() {
    var flag = true;

    //Validates the email is not empty and consists of a correct email format.
    if (
      this.data.emailAddress !== '' &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.data.emailAddress
      )
    ) {
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

  //Sends password reset request if they pass validation requirements.
  sendPasswordResetRequest() {
    if (this.emailValidation()) {
      // TODO: Encrypt email address and send to DB for lookup and response.
    } else {
      this.presentAlert();
    }
  }
}
