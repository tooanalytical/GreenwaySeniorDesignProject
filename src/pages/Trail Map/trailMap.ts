import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-trailMap',
  templateUrl: 'trailMap.html'
})
export class TrailMapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  // Icon on map displaying user's current location
  public icon = {
    url:
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/userpositionIcon.png',
    size: new google.maps.Size(22, 22),
    point: new google.maps.Point(0, 18),
    points: new google.maps.Point(11, 11)
  };
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {}

  ionViewWillEnter() {
    this.watchMap();
  }

  watchMap() {
    this.geolocation.getCurrentPosition().then(
      position => {
        let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        let mapOptions = {
          center: latLng,
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );

        var trailLayer = new google.maps.KmlLayer({
          url:
            'https://github.com/tooanalytical/GreenwaySeniorDesignProject/raw/master/src/assets/trailNetwork.kmz',
          map: this.map
        });
        
        let marker = new google.maps.Marker({
          map: this.map,
          icon: this.icon,
          position: latLng
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
