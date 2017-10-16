import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Camera} from 'ionic-native';

@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }


}
