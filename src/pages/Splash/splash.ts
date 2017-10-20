import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomePage } from '../home/home';
import { CreateAccountNamePage } from '../Create Account - Name/createAccountName';
import { PasswordResetPage } from '../Password Reset/passwordReset';
import { LoginPage } from '../Login/login';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {

  FB_APP_ID: number = 1103480846449706;

  constructor(public navCtrl: NavController, public fb: Facebook,
  	public nativeStorage: NativeStorage) {
      this.fb.browserInit(this.FB_APP_ID, "v2.8");


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
      let permissions = new Array<string>();
      let nav = this.navCtrl;
      let env = this;
      //the permissions your facebook app needs from the user
      permissions = ["public_profile"];


      this.fb.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        env.fb.api("/me?fields=name,gender", params)
        .then(function(user) {
          user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
          //now we have the users info, let's save it in the NativeStorage
          env.nativeStorage.setItem('user',
          {
            name: user.name,
            gender: user.gender,
            picture: user.picture
          })
          .then(function(){
            nav.setRoot(HomePage);
          }, function (error) {
            console.log(error);
          })
        })
      }, function(error){
        console.log(error);
      });
    }
}
