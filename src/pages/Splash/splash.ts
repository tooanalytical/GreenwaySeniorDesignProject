import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
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

    loginPage(){
      this.navCtrl.push(LoginPage);
    }

    createNewAccount(){
      this.navCtrl.push(CreateAccountNamePage);
    }

    resetPassword(){
      this.navCtrl.push(PasswordResetPage);
    }

    // Login credentials for Google authentication and redirect to dashboard.
    googleLogin(){
        GooglePlus.login({
          'webClientId': '407412318918-e4mig3cqfrsb1j80goqnltu7jigitako.apps.googleusercontent.com'
        }).then((res) => {
            console.log(res);
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log(err);
        });
    }

    facebookLogin(){
      
    }
}
