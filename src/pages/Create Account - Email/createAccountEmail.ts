import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Keyboard } from '@ionic-native/keyboard';

import { CreateAccountPasswordPage } from '../Create Account - Password/createAccountPassword';

@Component({
  selector: 'page-createAccountEmail',
  templateUrl: 'createAccountEmail.html'
})
export class CreateAccountEmailPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public http: Http,
    private keyboard: Keyboard
  ) {}

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: ''
  };

  rawReturn;

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

  //Presents a modal alert to the user if they violate email parameters.
  presentDuplicateAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oh no!',
      subTitle:
        'Email address entered already used by another user. Please enter another email address.',
      buttons: ['Ok']
    });
    alert.present();
  }

  // Verifies that the email address entered hasn't been entered into the database before
  verifyUniqueEmail(): Promise<any> {
    return new Promise((resolve, reject) => {
      var link =
        'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/check_user.php';

      var myData = JSON.stringify({
        emailAddress: this.data.emailAddress
      });
      this.http.post(link, myData).subscribe(
        data => {
          this.rawReturn = data['_body'];
          return resolve(data);
        },
        error => {
          console.log('Oooops!');
          return reject(error);
        }
      );
    });
  }

  //Closes keyboard upon pressing Return key
  closeKeyboard() {
    this.keyboard.close();
  }

  //Segues user to next step in process if they pass validation requirements or sign them in if account exists.
  createAccountNext() {
    if (this.emailValidation()) {
      this.verifyUniqueEmail().then(() => {
        if (this.rawReturn === '0') {
          this.navCtrl.push(CreateAccountPasswordPage, this.data);
        } else {
          this.presentDuplicateAlert();
        }
      });
    } else {
      this.presentAlert();
    }
  }
}
