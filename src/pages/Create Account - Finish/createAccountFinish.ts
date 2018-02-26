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
  selector: 'page-createaccountfinish',
  templateUrl: 'createAccountFinish.html'
})
export class CreateAccountFinishPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public storage: Storage,
    public http: Http
  ) {}

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');
  emailAddress = this.navParams.get('emailAddress');
  userPassword = this.navParams.get('userPassword');
  userBirthdate = this.navParams.get('userBirthdate');
  userHeight = this.navParams.get('userHeight');
  userWeight = this.navParams.get('userWeight');
  userGender = this.navParams.get('userGender');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: this.emailAddress,
    userPassword: this.userPassword,
    userBirthdate: this.userBirthdate,
    userHeight: this.userHeight,
    userWeight: this.userWeight,
    userGender: this.userGender,
    userLat: '',
    userLng: '',
    response: ''
  };

  getLocation() {
    this.geolocation.getCurrentPosition().then(
      position => {
        let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        let latitude = position.coords.latitude.toString();
        let longitude = position.coords.longitude.toString();
        this.setLat(latitude);
        this.setLng(longitude);
      },
      err => {
        console.log(err);
      }
    );
  }

  setLat(latitude) {
    this.data.userLat = latitude;
  }

  setLng(longitude) {
    this.data.userLng = longitude;
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
    this.storage.set('userPassword', this.data.userPassword);
    this.storage.set('userBirthdate', this.data.userBirthdate);
    this.storage.set('userHeight', this.data.userHeight);
    this.storage.set('userWeight', this.data.userWeight);
    this.storage.set('userGender', this.data.userGender);
    this.storage.set('userLoggedIn', true);
  }

  submit(data) {
    //Saves the new user information locally.
    this.setUserInfo();
    console.log(this.data.userHeight);
    this.getLocation();

    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/signup.php';
    var myData = JSON.stringify({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      emailAddress: this.emailAddress,
      userPassword: this.userPassword,
      userBirthdate: this.userBirthdate,
      userHeight: this.userHeight,
      userWeight: this.userWeight,
      userGender: this.userGender
    });

    this.http.post(link, myData).subscribe(
      data => {
        this.data.response = data['_body'];
        console.log(this.data.response);
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
