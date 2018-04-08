import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

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
  userData: any;
  FB_APP_ID: number = 1103480846449706;
  public userLoggedIn = this.storage.get('userLoggedIn').then(val => {
    this.userLoggedIn = val;
  });

  data = {
    action: '',
    userId: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    userAvatar: '',
    userBirthdate: '',
    userHeight: '',
    userWeight: '',
    userGender: ''
  };

  response = {
    action: '',
    userId: '',
    userBirthdate: '',
    userHeight: '',
    userWeight: '',
    userGender: ''
  };

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage,
    public storage: Storage,
    public http: Http
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
          // Response from Google
          console.log(res);

          this.data.firstName = res.givenName;
          this.data.lastName = res.familyName;
          this.data.emailAddress = res.email;
          this.data.userAvatar = res.imageUrl;

          var link =
            'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/login_social.php';
          var myData = JSON.stringify({
            emailAddress: this.data.emailAddress,
            action: 'check',
            from: 'google'
          });

          console.log('JSON sent to server: ' + myData);

          this.http.post(link, myData).subscribe(
            data => {
              var response = data['_body'];
              // Response from Server
              console.log('Received social auth response from server');

              var rawReturn = JSON.parse(response);

              this.data.action = rawReturn.action;
              this.data.userId = rawReturn.userId;
              this.data.userBirthdate = rawReturn.userBirthdate;
              this.data.userHeight = rawReturn.userHeight;
              this.data.userWeight = rawReturn.userWeight;
              this.data.userGender = rawReturn.userGender;

              // TODO: Check to see if user has signed in previously with Google Auth
              console.log('User Action: ' + this.data.action);
              if (this.data.action === 'login') {
                // If the user has signed in using Google Authentication before pull their account details and send to Dashboard Page
                this.setUserInfo();
                this.navCtrl.setRoot(HomePage);
              } else {
                // If the user hasn't signed in using Google Authenticion before send them through the account creation process.
                console.log('Data being sent to next page...');
                console.log(this.data);
                this.navCtrl.setRoot(
                  CreateAccountSocialBirthdatePage,
                  this.data
                );
              }
            },
            error => {
              console.log('Error retrieving Google auth info from server');
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  loginWithFB() {
    this.fb
      .login(['email', 'public_profile'])
      .then((response: FacebookLoginResponse) => {
        this.fb
          .api(
            'me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',
            []
          )
          .then(profile => {
            this.userData = {
              email: profile['email'],
              first_name: profile['first_name'],
              picture: profile['picture_large']['data']['url'],
              username: profile['name']
            };
          });
      });
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

  setUserInfo() {
    this.storage.set('userId', this.data.userId);
    this.storage.set('firstName', this.data.firstName);
    this.storage.set('lastName', this.data.lastName);
    this.storage.set(
      'fullName',
      this.data.firstName + ' ' + this.data.lastName
    );
    this.storage.set('email', this.data.emailAddress);
    this.storage.set('userBirthdate', this.data.userBirthdate);
    this.storage.set('userHeight', this.data.userHeight);
    this.storage.set('userWeight', this.data.userWeight);
    this.storage.set('userGender', this.data.userGender);
    this.storage.set('userAvatar', this.data.userAvatar);
    this.storage.set('userLoggedIn', true);
  }
}
