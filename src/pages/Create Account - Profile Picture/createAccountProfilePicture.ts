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
export class CreateAccountProfilePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {}
}
