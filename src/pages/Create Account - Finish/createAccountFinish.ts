import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

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
    public storage: Storage
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
    userLng: ''
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
  }

  submit(data) {
    //Saves the new user information locally.
    this.setUserInfo();
    //takes in data and sends it to server to create account

    //Gets the location of the user
    this.getLocation();

    this.navCtrl.setRoot(HomePage);
  }

  startOver() {
    // redirect to home
    this.navCtrl.setRoot(SplashPage);
  }
}
