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

@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  lastImage: string = null;
  loading: Loading;

  constructor(
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

  //JSON Object sent to server upon submit
  data = {
    userId: this.storage.get('userId').then(val => {
      this.data.userId = val;
    }),
    imageContent: '',
    selectedProblemType: '',
    problemSummary: '',
    additionalDetails: '',
    emailAddress: this.storage.get('email').then(val => {
      this.data.emailAddress = val;
    }),
    userLat: '',
    userLng: '',
    response: ''
  };

  //JSON Object used for select problem type wheel selector
  problemType = {
    type: [
      { description: '' },
      { description: 'Tree Branch' },
      { description: 'Broken Glass' },
      { description: 'High Water' },
      { description: 'Vandalism' },
      { description: 'Suspicious Persons' },
      { description: 'Litter' },
      { description: 'Overgrown Brush' },
      { description: 'Trash Full' },
      { description: 'Other' }
    ]
  };

  isUrgent: boolean = false;

  //Prompts user to select a problem type via wheel selector
  selectProblemType() {
    this.selector
      .show({
        title: 'Select Problem Type',
        items: [this.problemType.type]
      })
      .then(
        result => {
          this.data.selectedProblemType = result[0].description.toString();
          console.log(result[0].description + ' at index: ' + result[0].index);
        },
        err => console.log('Error: ', err)
      );
  }

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
      quality: 10,
      sourceType: sourceType,
      targetWidth: 375,
      targetHeight: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
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
    // Gets and sets user lng and lat to the JSON object
    this.getLocation();
    console.log('User location saved');
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

  // Submits the user's report to the server
  public submitReport() {
    // Let's user know their report is being sent
    this.loading = this.loadingCtrl.create({
      content: 'Sending Report...'
    });
    this.loading.present();
    console.log(this.data.userId);

    this.convertToBase64()
      .then(data => {
        var link =
          'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/report_problem.php';
        var myData = JSON.stringify({
          userId: this.data.userId,
          selectedProblemType: this.data.selectedProblemType,
          problemSummary: this.data.problemSummary,
          additionalDetails: this.data.additionalDetails,
          emailAddress: this.data.emailAddress,
          userLat: this.data.userLat,
          userLng: this.data.userLng,
          urgent: this.isUrgent,
          imageContent: this.data.imageContent
        });
        console.log(this.isUrgent);

        this.http.post(link, myData).subscribe(
          data => {
            this.data.response = data['_body'];
            this.loading.dismissAll();
            this.presentToast('Report Submitted. Thank You!');
          },
          error => {
            this.loading.dismissAll();
            this.presentToast('Error Submitting Report. Please try again.');
          }
        );
        this.clearReport();
      })

      .catch(error => console.log(error));
  }

  // Gets the user's location
  getLocation() {
    this.geolocation.getCurrentPosition().then(
      position => {
        // /TODO: SLATED FOR REMOVAL
        let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        // \TODO: SLATED FOR REMOVAL

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

  // Sets user latitude
  setLat(latitude) {
    this.data.userLat = latitude;
  }

  // Sets user longitude
  setLng(longitude) {
    this.data.userLng = longitude;
  }

  // Converts the selected image to Base64 format, assigns it to JSON data member and returns Promise.
  convertToBase64(): Promise<any> {
    return new Promise((resolve, reject) => {
      let filePath: string = this.pathForImage(this.lastImage);
      this.base64.encodeFile(filePath).then(
        (base64File: string) => {
          this.data.imageContent = base64File;
          console.log('Success Converting');
          return resolve(this.data.imageContent);
        },
        err => {
          console.log(err);
          console.log('Failure Converting');
          return reject(err);
        }
      );
    });
  }

  // Clears the fields and image from page
  clearReport() {
    this.lastImage = null;
    this.data.imageContent = '';
    this.data.selectedProblemType = '';
    this.data.problemSummary = '';
    this.data.additionalDetails = '';
    this.data.userLat = '';
    this.data.userLng = '';
    this.data.response = '';
    this.isUrgent = false;
  }
}
