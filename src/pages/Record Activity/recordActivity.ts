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

  public activityTimer = '00:00:00';
  public pausedTimer = '00:00:00';
  public stateButton = 'Start';
  public endButton = 'End';

  public activeSeconds;
  public activeMinutes;
  public activeHours;

  public pausedSeconds;
  public pausedMinutes;
  public pausedHours;

  public startedTime;
  public pausedTime;
  public resumedTime;

  public timePaused;

  public pause;
  public default;
  public timer_id_active;
  public timer_id_paused;
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
    this.startedTime = new Date();
    console.log('Start Time' + this.startedTime);
    this.timer_id_active = setInterval(() => {
      this.activeSeconds = Math.floor(
        (new Date().getTime() - this.startedTime.getTime()) / 1000
      );

      this.activeMinutes = Math.floor(this.activeSeconds / 60);
      this.activeHours = Math.floor(this.activeMinutes / 60);

      this.activeSeconds = this.activeSeconds - this.activeMinutes * 60;
      this.activeMinutes = this.activeMinutes - this.activeHours * 60;

      this.activeHours = this.addZero(this.activeHours);
      this.activeMinutes = this.addZero(this.activeMinutes);
      this.activeSeconds = this.addZero(this.activeSeconds);

      this.activityTimer =
        this.activeHours + ':' + this.activeMinutes + ':' + this.activeSeconds;
    }, 10);
  }

  pauseTimer() {
    this.pausedTime = new Date();
  }

  resetActivity() {
    clearInterval(this.timer_id_active);
    clearInterval(this.timer_id_paused);
    this.activityTimer = '00:00:00';
  }
  startActivity() {
    this.startTimer();
    this.startFlag = false;
    this.stateButton = 'Pause';
    this.pauseFlag = true;
  }

  pauseActivity() {
    this.pauseTimer();
    clearInterval(this.timer_id_active);
    console.log('Paused Time: ' + this.pausedTime);
    this.pauseFlag = false;
    this.stateButton = 'Resume';
    this.resumeFlag = true;
  }
  resumeActivity() {
    this.resumedTime = new Date();
    this.timer_id_active = setInterval(() => {
      this.activeSeconds = Math.floor(
        (new Date().getTime() -
          this.startedTime.getTime() -
          (this.resumedTime - this.pausedTime.getTime())) /
          1000
      );

      this.activeMinutes = Math.floor(this.activeSeconds / 60);
      this.activeHours = Math.floor(this.activeMinutes / 60);

      this.activeSeconds = this.activeSeconds - this.activeMinutes * 60;
      this.activeMinutes = this.activeMinutes - this.activeHours * 60;

      this.activeHours = this.addZero(this.activeHours);
      this.activeMinutes = this.addZero(this.activeMinutes);
      this.activeSeconds = this.addZero(this.activeSeconds);

      this.activityTimer =
        this.activeHours + ':' + this.activeMinutes + ':' + this.activeSeconds;
    }, 10);

    this.pauseFlag = true;
    this.stateButton = 'Pause';
    this.resumeFlag = false;
  }

  endActivity() {
    this.resetActivity();
    this.resumeFlag = false;
    this.pauseFlag = false;
    this.stateButton = 'Start';
    this.startFlag = true;
  }
}
