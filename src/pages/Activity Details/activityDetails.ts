import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-activityDetails',
  templateUrl: 'activityDetails.html'
})
export class ActivityDetailsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public storage: Storage,
    public geolocation: Geolocation
  ) {}

  activityData = this.navParams.get('activityData');

  ionViewWillLoad() {
    this.loadMap();
    this.convertActivityType();
  }

  loadMap() {
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then(
      position => {
        let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        let mapOptions = {
          center: latLng,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  convertActivityType() {
    if (this.activityData.activityType == '1') {
      this.activityData.activityType = 'Walking';
    } else if (this.activityData.activityType == '2') {
      this.activityData.activityType = 'Running';
    } else if (this.activityData.activityType == '3') {
      this.activityData.activityType = 'Cycling';
    }
  }
}
