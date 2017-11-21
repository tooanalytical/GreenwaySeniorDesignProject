import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PasswordResetPage } from '../Password Reset/passwordReset';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(public navCtrl: NavController) {}

  data = {
    emailAddress: '',
    userPassword: ''
  };

  login(data) {}

  loginBypass() {
    this.navCtrl.setRoot(HomePage);
  }

  resetPassword() {
    this.navCtrl.push(PasswordResetPage);
  }
}
