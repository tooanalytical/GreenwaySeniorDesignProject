import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-recordActivity',
  templateUrl: 'recordActivity.html'
})
export class RecordActivityPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public activityTimer = '00:00:00';
  public stateButton = 'Start';
  public endButton = 'End';

  public activeTime;
  public totalTime;

  public activeSeconds;
  public activeMinutes;
  public activeHours;

  public startedTime;

  public timer_id_active;
  public startFlag = true;
  public pauseFlag = false;
  public resumeFlag = false;

  public startButtonColor: string = '#37721b'; //Light Green
  public resumeButtonColor: string = '#37721b'; //Light Green
  public pauseButtonColor: string = '#ff0000'; //Red
  public endButtonColor: string = '#ff0000'; //Red

  public subscription;
  public mphString = '0';
  public lat1 = 0;
  public lat2 = 0;
  public lng1 = 0;
  public lng2 = 0;
  public counter = 0;

  public totalDistance;
  public totalDistanceString = '0.00';
  public segmentCalories;
  public totalCalories;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public alertCtrl: AlertController,
    public platform: Platform
  ) {}

  //Code which is ran after the page is loaded
  ionViewDidLoad() {
    this.loadMap();
  }

  //Code which will run before the user leaves the page
  ionViewCanLeave(): boolean {
    // here we can either return true or false
    // depending on if we want to leave this view
    if (this.totalTime !== 0) {
      return true;
    } else {
      //TODO: Display modal alert asking if they'd like to continue their run, end and save activity, or end and discard activity.

      let alert = this.alertCtrl.create({
        title: 'Uh oh!',
        subTitle: 'Please enter your birthdate.',
        buttons: ['Ok']
      });
      alert.present();
      return false;
    }
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
          position: latLng,
          map: this.map,
          icon: new google.maps.MarkerImage(
            '//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
            new google.maps.Size(22, 22),
            new google.maps.Point(0, 18),
            new google.maps.Point(11, 11)
          )
        });

        marker.setMap(this.map);
      },
      err => {
        console.log(err);
      }
    );
  }

  // Selects the function to use based upon the value of the button.
  activityManager() {
    if (this.stateButton === 'Start') {
      this.startActivity();
    } else if (this.stateButton === 'Pause') {
      this.pauseActivity();
    } else if (this.stateButton === 'Resume') {
      this.resumeActivity();
    }
  }

  // Adds a zero to the tens place of the timer as placeholder
  public addZero = function(value) {
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  };

  //Starts user activity and changes UI elements
  startActivity() {
    this.startTimer();
    this.watchCurrentSpeed();

    this.startFlag = false;
    this.stateButton = 'Pause';
    this.pauseFlag = true;
  }

  //Pauses user activity and changes UI elements
  pauseActivity() {
    clearInterval(this.timer_id_active);
    this.endWatchCurrentSpeed();

    this.totalTime += this.activeTime;

    this.pauseFlag = false;
    this.stateButton = 'Resume';
    this.resumeFlag = true;
  }

  //Resumes user activity and changes UI elements
  resumeActivity() {
    this.resumeTimer();
    this.watchCurrentSpeed();

    this.pauseFlag = true;
    this.stateButton = 'Pause';
    this.resumeFlag = false;
  }

  //Starts timer for user activity
  startTimer() {
    this.startedTime = new Date();
    this.totalTime = 0;
    this.timer_id_active = setInterval(() => {
      this.activeTime = Math.floor(
        new Date().getTime() - this.startedTime.getTime()
      );

      this.activeSeconds = Math.floor(this.activeTime / 1000);

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

  //Resumes timer for user activity
  resumeTimer() {
    this.startedTime = new Date();

    this.timer_id_active = setInterval(() => {
      this.activeTime = Math.floor(
        new Date().getTime() - this.startedTime.getTime()
      );

      this.activeSeconds = Math.floor(
        (this.totalTime + this.activeTime) / 1000
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

  watchCurrentSpeed() {
    this.platform.ready().then(() => {
      let options = {
        enableHighAccuracy: true
      };
      let tempSpeed;
      this.subscription = this.geolocation
        .watchPosition(options)
        .subscribe(position => {
          this.lat2 = this.lat1;
          this.lng2 = this.lng1;
          console.log(position);
          tempSpeed = position.coords.speed;
          if (tempSpeed < 0) {
            tempSpeed = 0;
          }
          tempSpeed = tempSpeed * 2.23694;
          tempSpeed = Math.round(tempSpeed);
          this.mphString = tempSpeed.toString();
          this.lat1 = position.coords.latitude;
          this.lng1 = position.coords.longitude;
          // Doesn't run the calculation and outputs to display on first data gathered.
          if (this.counter > 0) {
            this.totalDistance += this.calculateDistance(
              this.lat1,
              this.lat2,
              this.lng1,
              this.lng2
            );
            this.totalDistanceString = this.totalDistance.toString();
          } else {
            this.counter++;
          }
        });
    });
  }

  endWatchCurrentSpeed() {
    this.subscription.unsubscribe();
  }

  //Calculates distance between two points using the haversine formula
  calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {
    let p = 0.017453292519943295; // Math.PI / 180
    let c = Math.cos;
    let a =
      0.5 -
      c((lat1 - lat2) * p) / 2 +
      c(lat2 * p) * c(lat1 * p) * (1 - c((long1 - long2) * p)) / 2;
    let distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    return distance;
  }

  //TODO: Calculate user's calories burned.
  getCaloriesBurned() {}

  //Ends user activity and changes UI elements
  endActivity() {
    clearInterval(this.timer_id_active);
    this.endWatchCurrentSpeed();

    this.activityTimer = '00:00:00';
    this.totalTime = 0;
    this.mphString = '0';
    this.totalDistanceString = '0.00';
    this.counter = 0;

    this.resumeFlag = false;
    this.pauseFlag = false;
    this.stateButton = 'Start';
    this.startFlag = true;
  }
}
