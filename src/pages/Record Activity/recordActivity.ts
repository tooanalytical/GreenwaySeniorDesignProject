import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-recordActivity',
  templateUrl: 'recordActivity.html'
})
export class RecordActivityPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public timer = '00:00:00';
  public stateButton = 'Start';
  public endButton = 'End';
  public seconds;
  public minutes;
  public hours;
  public startTime;
  public now;
  public start;
  public default;
  public timer_id;
  public startFlag = true;
  public pauseFlag = false;
  public resumeFlag = false;
  public state = '0';

  public startButtonColor: string = '#37721b'; //Light Green
  public resumeButtonColor: string = '#37721b'; //Light Green
  public pauseButtonColor: string = '#ff0000'; //Red
  public endButtonColor: string = '#ff0000'; //Red

  public addZero = function(value) {
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  };

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {}

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then(
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

  activityManager() {
    if (this.stateButton === 'Start') {
      this.startActivity();
    } else if (this.stateButton === 'Pause') {
      this.pauseActivity();
    } else if (this.stateButton === 'Resume') {
      this.resumeActivity();
    }
  }
  startTimer() {
    this.start = new Date();
    this.timer_id = setInterval(() => {
      this.seconds = Math.floor(
        (new Date().getTime() - this.start.getTime()) / 1000
      );
      this.minutes = Math.floor(this.seconds / 60);
      this.hours = Math.floor(this.minutes / 60);

      this.seconds = this.seconds - this.minutes * 60;
      this.minutes = this.minutes - this.hours * 60;

      this.hours = this.addZero(this.hours);
      this.minutes = this.addZero(this.minutes);
      this.seconds = this.addZero(this.seconds);

      this.timer = this.hours + ':' + this.minutes + ':' + this.seconds;
    }, 10);
  }

  pauseTimer() {}

  resetTimer() {
    clearInterval(this.timer_id);
    this.timer = '00:00:00';
  }
  startActivity() {
    this.startTimer();

    this.startFlag = false;
    this.stateButton = 'Pause';
    this.pauseFlag = true;
  }

  resumeActivity() {
    this.pauseFlag = true;
    this.stateButton = 'Pause';
    this.resumeFlag = false;
  }

  pauseActivity() {
    this.pauseFlag = false;
    this.stateButton = 'Resume';
    this.resumeFlag = true;
  }

  endActivity() {
    this.resetTimer();
    this.resumeFlag = false;
    this.pauseFlag = false;
    this.stateButton = 'Start';
    this.startFlag = true;
  }
}
