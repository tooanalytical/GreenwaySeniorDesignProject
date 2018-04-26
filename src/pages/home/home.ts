import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  firstName;
  weather:any;
  map:any;
  ticketData: Array<any>;
  location:{
    city:string,
    state:string
  }

  public initialMap;
  public subscriptionMap;

  constructor(public navCtrl: NavController,
     public storage: Storage,
     public geolocation: Geolocation,
     public platform: Platform,
     public http: Http,
     private weatherProvider: WeatherProvider) 
     {
    this.getUserInfo();
    this.userStatisticData.response = '';
    this.http = http;
  }

  public userStatisticData = {
    userId: this.storage.get('userId').then(val => {
      this.userStatisticData.userId = val;
    }),
    totalDistanceWalking: '0',
    totalDistanceRunning: '0',
    totalDistanceCycling: '0',
    totalDistanceTraveled: '0',
    response: ''
  }

  public icon = {
    url:
      '../assets/userposition.png',
    size: new google.maps.Size(22, 22),
    point: new google.maps.Point(0, 18),
    points: new google.maps.Point(11, 11)
  };

  public ticketIcon = {
    url:
      'http://52.227.182.243/images/markerLogo.png',

  };

  // Marker object containing icon of user's location
  public marker = new google.maps.Marker({
    map: this.map,
    icon: this.icon
  });
  getUserInfo() {
    this.storage.get('firstName').then(val => {
      this.firstName = val;
    });
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

        this.marker.setMap(this.map);
        this.marker.setPosition(latLng);
      },
      err => {
        console.log(err);
      }
    );
  }
  watchLocation() {
    this.platform.ready().then(() => {
      let options = {
        enableHighAccuracy: true
      };
      this.subscriptionMap = this.geolocation
        .watchPosition(options)
        .subscribe(position => {
          let latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          this.marker.setPosition(latLng);
          this.map.setCenter(latLng);
        });
    });
  }
  getUserStatistics() {
    var link =
      'http://52.227.182.243/Mobile_Connections/get_statistics.php';
    var myData = JSON.stringify({
      userId: this.userStatisticData.userId
    });
    this.http.post(link, myData).subscribe(
      data => {
        var response = data['_body'];

        var rawReturn = JSON.parse(response);

        if (rawReturn.totalDistance_Walking === null) {
          this.userStatisticData.totalDistanceWalking = '0';
        } else {
          this.userStatisticData.totalDistanceWalking =
            rawReturn.totalDistance_Walking;
          this.userStatisticData.totalDistanceWalking = this.userStatisticData.totalDistanceWalking.match(
            /^-?\d+(?:\.\d{0,2})?/
          )[0];
        }

        if (rawReturn.totalDistance_Running === null) {
          this.userStatisticData.totalDistanceRunning = '0';
        } else {
          this.userStatisticData.totalDistanceRunning =
            rawReturn.totalDistance_Running;
          this.userStatisticData.totalDistanceRunning = this.userStatisticData.totalDistanceRunning.match(
            /^-?\d+(?:\.\d{0,2})?/
          )[0];
        }

        if (rawReturn.totalDistance_Biking === null) {
          this.userStatisticData.totalDistanceCycling = '0';
        } else {
          this.userStatisticData.totalDistanceCycling =
            rawReturn.totalDistance_Biking;
          this.userStatisticData.totalDistanceCycling = this.userStatisticData.totalDistanceCycling.match(
            /^-?\d+(?:\.\d{0,2})?/
          )[0];
        }

        if (rawReturn.totalDistance_Overall === null) {
          this.userStatisticData.totalDistanceTraveled = '0';
        } else {
          this.userStatisticData.totalDistanceTraveled =
            rawReturn.totalDistance_Overall;
          this.userStatisticData.totalDistanceTraveled = this.userStatisticData.totalDistanceTraveled.match(
            /^-?\d+(?:\.\d{0,2})?/
          )[0];
        }
      },
      error => {
        console.log('Oooops!');
      }
    );
  }
ionViewWillEnter(){
    this.loadMap();
    this.getUserStatistics();
    this.storage.get('location').then((val) => {
      this.location = {
        city: 'Fort Wayne',
        state: 'IN'
      }

      this.weatherProvider.getWeather(this.location.city, this.location.state)  .subscribe(weather => {
          this.weather = weather.current_observation;
        });
    });
  }

}
