import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { SplashPage } from '../Splash/splash';
import { HomePage } from '../home/home';

declare var google;

@Component({
  selector: 'page-createaccountsocialfinish',
  templateUrl: 'createAccountSocialFinish.html'
})
export class CreateAccountSocialFinishPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public storage: Storage,
    public http: Http
  ) {}

  ionViewWillEnter() {
    this.getLocation();
  }

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');
  emailAddress = this.navParams.get('emailAddress');
  userBirthdate = this.navParams.get('userBirthdate');
  userHeight = this.navParams.get('userHeight');
  userWeight = this.navParams.get('userWeight');
  userGender = this.navParams.get('userGender');
  userAvatar = this.navParams.get('userAvatar');
  idToken = this.navParams.get('idToken');
  from = this.navParams.get('from');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: this.emailAddress,
    idToken: this.idToken,
    from: this.from,
    userBirthdate: this.userBirthdate,
    userHeight: this.userHeight,
    userWeight: this.userWeight,
    userGender: this.userGender,
    userAvatar: this.userAvatar,
    userLat: '',
    userLng: '',
    response: ''
  };

  getLocation() {
    this.geolocation.getCurrentPosition().then(
      position => {
        this.data.userLat = position.coords.latitude.toString();
        this.data.userLng = position.coords.longitude.toString();
      },
      err => {
        console.log(err);
      }
    );
  }

  //Saves the user's information to local storage for access later.
  setUserInfo() {
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

  submit(data) {
    //Saves the new user information locally.
    this.setUserInfo();

    var link =
      'http://52.227.182.243/Mobile_Connections/signup_social.php';
    var myData = JSON.stringify({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      emailAddress: this.data.emailAddress,
      idToken: this.data.idToken,
      from: this.data.from,
      userBirthdate: this.data.userBirthdate,
      userHeight: this.data.userHeight,
      userWeight: this.data.userWeight,
      userGender: this.data.userGender,
      userAvatar: this.data.userAvatar,
      userLat: this.data.userLat,
      userLng: this.data.userLng,
      userId: ''
    });

    this.http.post(link, myData).subscribe(
      data => {
        this.data.response = data['_body'];
        console.log('User Id: ' + this.data.response);
        this.storage.set('userId', this.data.response);
      },
      error => {
        console.log('Oooops!');
      }
    );

    // TO SEE SERVER RESPONSE, DISABLE ME
    this.navCtrl.setRoot(HomePage);
  }

  startOver() {
    // redirect to home
    this.navCtrl.setRoot(SplashPage);
  }
}
