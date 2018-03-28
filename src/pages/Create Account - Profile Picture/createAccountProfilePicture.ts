import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import {
  NavController,
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController,
  Loading
} from 'ionic-angular';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Base64 } from '@ionic-native/base64';
import { Http } from '@angular/http';

declare var cordova: any;
declare var google;

import { CreateAccountFinishPage } from '../Create Account - Finish/createAccountFinish';

@Component({
  selector: 'page-createAccountProfilePicture',
  templateUrl: 'createAccountProfilePicture.html'
})
export class CreateAccountProfilePicturePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
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
    userAvatar: ''
  };
}
