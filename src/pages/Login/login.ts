import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
<<<<<<< HEAD
import { CreateAccountPage } from '../Create Account/createAccount';
=======
import { CreateAccountNamePage } from '../Create Account - Name/createAccountName';
>>>>>>> 42888908b03d272efdc2bf76bd948bdfa073f0a3
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
<<<<<<< HEAD
      this.navCtrl.push(CreateAccountPage);
=======
      this.navCtrl.push(CreateAccountNamePage);
>>>>>>> 42888908b03d272efdc2bf76bd948bdfa073f0a3
    }

    resetPassword(){
      this.navCtrl.push(PasswordResetPage);
    }

}
