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
  lastImage: string = null;
  loading: Loading;
  constructor(
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public selector: WheelSelector,
    public storage: Storage,
    public geolocation: Geolocation,
    private base64: Base64,
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
    userAvatar: ''
  };

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Camera Roll',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  // Takes a picture for the user and prepares it for submission
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      targetWidth: 375,
      targetHeight: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      cameraDirection: 1
    };

    // Get the data of an image
    this.camera.getPicture(options).then(
      imagePath => {
        // Special handling for Android library
        if (
          this.platform.is('android') &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filePath.resolveNativePath(imagePath).then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf('/') + 1,
              imagePath.lastIndexOf('?')
            );
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        }
      },
      err => {
        this.presentToast('Error while selecting image.');
      }
    );
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        success => {
          this.lastImage = newFileName;
        },
        error => {
          this.presentToast('Error while storing file.');
        }
      );
  }

  // Presents messages to user
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  // Converts the selected image to Base64 format, assigns it to JSON data member and returns Promise.
  convertToBase64(): Promise<any> {
    return new Promise((resolve, reject) => {
      let filePath: string = this.pathForImage(this.lastImage);
      console.log('Filepath used: ' + filePath);
      this.base64.encodeFile(filePath).then(
        (base64File: string) => {
          this.data.userAvatar = base64File;
          console.log('Success Converting');
          console.log('Image base 64: ' + this.data.userAvatar);
          return resolve(this.data.userAvatar);
        },
        err => {
          console.log(err);
          console.log('Failure Converting');
          return reject(err);
        }
      );
    });
  }

  createAccountNext() {
    if (this.lastImage !== null) {
      console.log('User took photo. Moving on...');
      this.convertToBase64().then(data => {
        this.data.userAvatar = data;
        this.navCtrl.push(CreateAccountFinishPage, this.data);
      });
    } else {
      console.log('User no photo. Setting default profile photo');

      let filePath: string = this.pathForImage(this.lastImage);

      // this.navCtrl.push(CreateAccountFinishPage, this.data);
    }
  }
}
