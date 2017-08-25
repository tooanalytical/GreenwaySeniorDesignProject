import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CreateAccountPage } from '../Create Account/createAccount';
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
      this.navCtrl.push(CreateAccountPage);
    }

    resetPassword(){
      this.navCtrl.push(PasswordResetPage);
    }

}
