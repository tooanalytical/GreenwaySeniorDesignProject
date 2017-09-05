import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CreateAccountNamePage } from '../Create Account - Name/createAccountName';
import { PasswordResetPage } from '../Password Reset/passwordReset';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {



    }

    loginBypass(){
      this.navCtrl.setRoot(HomePage);
    }

    createNewAccount(){
      this.navCtrl.push(CreateAccountNamePage);
    }

    resetPassword(){
      this.navCtrl.push(PasswordResetPage);
    }

}
