import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PasswordResetPage } from '../Password Reset/passwordReset';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public storage: Storage,
    public http: Http
  ) {}

  userInfo = {
    userId: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    userBirthdate: '',
    userHeight: '',
    userWeight: '',
    userGender: '',
    userAvatar: ''
  };

  data = {
    emailAddress: '',
    userPassword: ''
  };

  login() {
    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/login_user.php';

    var myData = JSON.stringify({
      emailAddress: this.data.emailAddress,
      userPassword: this.data.userPassword
    });

    this.http.post(link, myData).subscribe(
      data => {
        var response = data['_body'];
        console.log(response);

        if (response === '4') {
          console.log('4 Attempt Left Password Mismatch');
          this.loginErrorAlert4AttemptsLeft();
        } else if (response === '3') {
          console.log('3 Attempt Left Password Mismatch');
          this.loginErrorAlert3AttemptsLeft();
        } else if (response === '2') {
          console.log('2 Attempt Left Password Mismatch');
          this.loginErrorAlert2AttemptsLeft();
        } else if (response === '1') {
          console.log('1 Attempt Left Password Mismatch');
          this.loginErrorAlert1AttemptLeft();
        } else if (response === '-1') {
          console.log('User Account is Locked');
          this.loginErrorAlert0AttemptsLeft();
        } else if (response === '-2') {
          console.log('User Account Not Found');
          this.loginErrorUserNotFound();
        } else if (response === '-3') {
          console.log('JSON not valid');
          this.loginErrorJSON();
        } else {
          console.log('Sucessful Login');

          var rawReturn = JSON.parse(response);

          this.userInfo.userId = rawReturn.userId;
          this.userInfo.firstName = rawReturn.firstName;
          this.userInfo.lastName = rawReturn.lastName;
          this.userInfo.emailAddress = rawReturn.emailAddress;
          this.userInfo.userBirthdate = rawReturn.userBirthday;
          this.userInfo.userHeight = rawReturn.userHeight;
          this.userInfo.userWeight = rawReturn.userWeight;
          this.userInfo.userGender = rawReturn.userGender;
          this.userInfo.userAvatar = rawReturn.userAvatar;

          this.setUserInfo();
          this.navCtrl.setRoot(HomePage);
        }
      },
      error => {
        // TODO: Add login error handling here
        console.log('Oooops!');
      }
    );
  }

  setUserInfo() {
    this.storage.set('userId', this.userInfo.userId);
    this.storage.set('firstName', this.userInfo.firstName);
    this.storage.set('lastName', this.userInfo.lastName);
    this.storage.set(
      'fullName',
      this.userInfo.firstName + ' ' + this.userInfo.lastName
    );
    this.storage.set('email', this.userInfo.emailAddress);
    this.storage.set('userBirthdate', this.userInfo.userBirthdate);
    this.storage.set('userHeight', this.userInfo.userHeight);
    this.storage.set('userWeight', this.userInfo.userWeight);
    this.storage.set('userGender', this.userInfo.userGender);
    this.storage.set('userAvatar', this.userInfo.userAvatar);
    this.storage.set('userLoggedIn', true);
  }

  resetPassword() {
    this.navCtrl.push(PasswordResetPage);
  }

  //Presents a modal alert to the user entering in the wrong password (4 attempts left)
  loginErrorAlert4AttemptsLeft() {
    let alert = this.alertCtrl.create({
      title: 'Password Invalid',
      subTitle: 'Please try again.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents a modal alert to the user entering in the wrong password (3 attempts left)
  loginErrorAlert3AttemptsLeft() {
    let alert = this.alertCtrl.create({
      title: 'Password Invalid',
      subTitle: '3 Attempts left. Please try again.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents a modal alert to the user entering in the wrong password (2 attempts left)
  loginErrorAlert2AttemptsLeft() {
    let alert = this.alertCtrl.create({
      title: 'Password Invalid',
      subTitle: '2 Attempts left. Please try again.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents a modal alert to the user entering in the wrong password (1 attempts left)
  loginErrorAlert1AttemptLeft() {
    let alert = this.alertCtrl.create({
      title: 'Password Invalid',
      subTitle: '1 Attempts left. Please try again.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents a modal alert to the user entering in the wrong password (0 attempts left)
  loginErrorAlert0AttemptsLeft() {
    let alert = this.alertCtrl.create({
      title: 'Password Invalid',
      subTitle: 'Account Locked. Please contact administrator.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents a modal alert to the user when an account is not found
  loginErrorUserNotFound() {
    let alert = this.alertCtrl.create({
      title: 'User Not Found',
      subTitle: 'Verify email address and please try again.',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents a modal alert to the user when there's a JSON error.
  loginErrorJSON() {
    let alert = this.alertCtrl.create({
      title: 'Uh oh!',
      subTitle: 'There was an error. Please try again.',
      buttons: ['Ok']
    });
    alert.present();
  }
}
