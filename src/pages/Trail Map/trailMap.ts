import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';

declare var google;

@Component({
  selector: 'page-trailMap',
  templateUrl: 'trailMap.html'
})
export class TrailMapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  ticketData: Array<any>;
  // Icon on map displaying user's current location
 
  public ticketIcon = {
    url:
      '../assets/ViridianLogoTicket.png',

  };
  
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public http: Http
  ) {}

  ionViewWillEnter() {
    this.watchMap();
    this.getTicketData();
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
          position: latLng
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  getTicketData() {
    console.log('getTicketData() called');
  
    var link =
      'http://52.227.182.243/Mobile_Connections/add_Trail_Problems.php';
    var myData = JSON.stringify({
  
    });
    console.log('Calling post...');
    this.http.post(link, myData).subscribe(data => {
      var response = data['_body'];
      console.log('Response: ' + response);
      console.log("updated build");
      this.ticketData = JSON.parse(response);
      var ticketLat, ticketLng, ticketId, ticketType;
      console.log('Now in ticketData Array: ' + this.ticketData);
      for (let activity in this.ticketData) {
      
        ticketLat = this.ticketData[activity].gpsLat;
        ticketLng = this.ticketData[activity].gpsLong;
        ticketId = this.ticketData[activity].ticketId;
        ticketType = this.ticketData[activity].ticketType;
        this.addMarker(ticketId, ticketType, ticketLat, ticketLng);
      }
    });
  }

  addMarker(ticketId, ticketType, ticketLat, ticketLng){
    console.log("In addMarker");
    let latLng = new google.maps.LatLng(
      ticketLat,
      ticketLng
    );
    console.log("latlng: " + latLng);
    var marker;
    marker = new google.maps.Marker({
      map: this.map,
      icon: this.ticketIcon,
      title: ticketType,
      position: latLng
    });

    marker.setMap(this.map);
  }
}