import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { SplashPage } from '../Splash/splash';

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
    public geolocation: Geolocation
  ) {}

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');
  emailAddress = this.navParams.get('emailAddress');
  userPassword = this.navParams.get('userPassword');
  userPasswordConfirm = this.navParams.get('userPasswordConfirm');
  userBirthdate = this.navParams.get('userBirthdate');
  userHeight = this.navParams.get('userHeight');
  userWeight = this.navParams.get('userWeight');
  userSex = this.navParams.get('userSex');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: this.emailAddress,
    userPassword: this.userPassword,
    userPasswordConfirm: this.userPasswordConfirm,
    userBirthdate: this.userBirthdate,
    userHeight: this.userHeight,
    userWeight: this.userWeight,
    userSex: this.userSex,
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

  submit(data) {
    //takes in data and sends it to server to create account

    //Gets the location of the user
    this.getLocation();
  }

  startOver() {
    // redirect to home
    this.navCtrl.setRoot(SplashPage);
  }
}
