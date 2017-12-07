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

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {}

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.watchPosition().subscribe(
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
          icon: new google.maps.MarkerImage(
            '//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
            new google.maps.Size(22, 22),
            new google.maps.Point(0, 18),
            new google.maps.Point(11, 11)
          ),
          position: latLng
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
