import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CreateAccountNamePage } from '../Create Account - Name/createAccountName';
import { PasswordResetPage } from '../Password Reset/passwordReset';
import { LoginPage } from '../Login/login';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {

  constructor(public navCtrl: NavController) {



    }

    loginBypass(){
      this.navCtrl.push(LoginPage);
    }

    createNewAccount(){
      this.navCtrl.push(CreateAccountNamePage);
    }

    resetPassword(){
      this.navCtrl.push(PasswordResetPage);
    }
}
