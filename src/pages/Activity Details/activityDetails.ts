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

  // Loads map of user activity and overlays polylines showing activity path
  loadMap() {
    let activityPathCoordinates = this.activityData.locationData;

    let activityCenter = new google.maps.LatLng(
      activityPathCoordinates[0].lat,
      activityPathCoordinates[0].lng
    );

    let mapOptions = {
      center: activityCenter,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var activityPath = new google.maps.Polyline({
      path: activityPathCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    activityPath.setMap(this.map);
  }

  // Converts activity type values sent from server to appropriate naming convention
  convertActivityType() {
    if (this.activityData.activityType == '1') {
      this.activityData.activityType = 'Running';
    } else if (this.activityData.activityType == '2') {
      this.activityData.activityType = 'Walking';
    } else if (this.activityData.activityType == '3') {
      this.activityData.activityType = 'Cycling';
    }
  }
}
