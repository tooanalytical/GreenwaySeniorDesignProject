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

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      var trailLayer = new google.maps.KmlLayer({
          url: 'https://github.com/tooanalytical/GreenwaySeniorDesignProject/raw/master/src/assets/trailNetwork.kml',
          trailLayer.setMap(this.map);
        });


    }, (err) => {
      console.log(err);
    });

  }
}
