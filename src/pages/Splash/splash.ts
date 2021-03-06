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

  data = {
    action: '',
    idToken: '',
    from: '',
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

  public userLoggedIn;

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage,
    public storage: Storage,
    public http: Http
  ) {
    this.userLoggedIn = this.storage.get('userLoggedIn').then(val => {
      this.userLoggedIn = val;
    });
    this.fb.browserInit(this.FB_APP_ID, 'v2.8');

    if ((this.userLoggedIn = true)) {
    } else {
      fb
        .getLoginStatus()
        .then(res => {
          console.log(res.status);
          if (res.status === 'connect') {
            this.userLoggedIn = true;
            console.log('FB login status true');
          } else {
            this.userLoggedIn = false;
            console.log('FB login status false');
          }
        })
        .catch(e => console.log(e));
    }
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
          this.data.idToken = res.idToken;
          this.data.from = 'google';

          var link =
            'http://52.227.182.243/Mobile_Connections/check_user.php';
          var myData = JSON.stringify({
            emailAddress: this.data.emailAddress
          });

          this.http.post(link, myData).subscribe(
            data => {
              var response = data['_body'];
              // Response from Server
              console.log(
                'Received social auth response from server check_user.php'
              );
              console.log('Raw return: ' + response);

              // If the user has signed in using Google Authentication before pull their account details and send to Dashboard Page
              if (response === '1') {
                var link =
                  'http://52.227.182.243/Mobile_Connections/login_social.php';
                var myData = JSON.stringify({
                  from: this.data.from,
                  idToken: this.data.idToken
                });

                this.http.post(link, myData).subscribe(data => {
                  var response = data['_body'];
                  // Response from Server login_social.php
                  console.log(
                    'Received social auth response from server login_social.php'
                  );
                  console.log('Raw return: ' + response);

                  var rawReturn = JSON.parse(response);

                  this.data.userId = rawReturn.userId;
                  this.data.userBirthdate = rawReturn.userBirthdate;
                  this.data.userHeight = rawReturn.userHeight;
                  this.data.userWeight = rawReturn.userWeight;
                  this.data.userGender = rawReturn.userGender;

                  this.setUserInfo();
                  this.navCtrl.setRoot(HomePage);
                });
              } else {
                // If the user hasn't signed in using Google Authentication before send them through the account creation process.
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

  // Login credentials for Facebook authentication and redirect to dashboard.
  loginWithFB() {
    if (this.userLoggedIn) {
      this.navCtrl.setRoot(HomePage);
    } else {
      this.fb
        .login(['email', 'public_profile'])
        .then((response: FacebookLoginResponse) => {
          console.log('Response 1:' + response);
          this.fb
            .api(
              'me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',
              []
            )
            .then(profile => {
              console.log('Response 2:' + profile);
              this.userData = {
                email: profile['email'],
                first_name: profile['first_name'],
                picture: profile['picture_large']['data']['url'],
                username: profile['name']
              };
            });
        });
    }
  }

  // facebookLogin() {
  //   let permissions = new Array<string>();
  //   let nav = this.navCtrl;
  //   let env = this;
  //   //the permissions your facebook app needs from the user
  //   permissions = ['public_profile'];

  //   this.fb.login(permissions).then(
  //     function(response) {
  //       let userId = response.authResponse.userID;
  //       let params = new Array<string>();

  //       //Getting name and gender properties
  //       env.fb.api('/me?fields=name,gender', params).then(function(user) {
  //         user.picture =
  //           'https://graph.facebook.com/' + userId + '/picture?type=large';
  //         //now we have the users info, let's save it in the Storage
  //         env.nativeStorage
  //           .setItem('user', {
  //             name: user.name,
  //             gender: user.gender,
  //             picture: user.picture
  //           })
  //           .then(
  //             function() {
  //               nav.setRoot(CreateAccountSocialBirthdatePage);
  //             },
  //             function(error) {
  //               console.log(error);
  //             }
  //           );
  //       });
  //     },
  //     function(error) {
  //       console.log(error);
  //     }
  //   );
  // }

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
