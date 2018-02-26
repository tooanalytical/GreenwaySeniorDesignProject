import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { CreateAccountNamePage } from '../Create Account - Name/createAccountName';
import { CreateAccountSocialBirthdatePage } from '../Create Account - Social - Birthdate/createAccountSocialBirthdate';
import { PasswordResetPage } from '../Password Reset/passwordReset';
import { LoginPage } from '../Login/login';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {
  FB_APP_ID: number = 1103480846449706;
  public userLoggedIn = this.storage.get('userLoggedIn').then(val => {
    this.userLoggedIn = val;
  });

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage,
    public storage: Storage
  ) {
    this.fb.browserInit(this.FB_APP_ID, 'v2.8');
  }

  // Navigates user to Login Page
  loginPage() {
    this.navCtrl.push(LoginPage);
  }

  // Navigates user to new account creation process
  createNewAccount() {
    this.navCtrl.push(CreateAccountNamePage);
  }

  // Navigates user to password reset process
  resetPassword() {
    this.navCtrl.push(PasswordResetPage);
  }

  // Login credentials for Google authentication and redirect to dashboard.
  googleLogin() {
    if (this.userLoggedIn) {
      this.navCtrl.setRoot(HomePage);
    } else {
      GooglePlus.login({
        webClientId:
          '407412318918-e4mig3cqfrsb1j80goqnltu7jigitako.apps.googleusercontent.com'
      }).then(
        res => {
          
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  facebookLogin() {
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;
    //the permissions your facebook app needs from the user
    permissions = ['public_profile'];

    this.fb.login(permissions).then(
      function(response) {
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        env.fb.api('/me?fields=name,gender', params).then(function(user) {
          user.picture =
            'https://graph.facebook.com/' + userId + '/picture?type=large';
          //now we have the users info, let's save it in the Storage
          env.nativeStorage
            .setItem('user', {
              name: user.name,
              gender: user.gender,
              picture: user.picture
            })
            .then(
              function() {
                nav.setRoot(CreateAccountSocialBirthdatePage);
              },
              function(error) {
                console.log(error);
              }
            );
        });
      },
      function(error) {
        console.log(error);
      }
    );
  }
}
