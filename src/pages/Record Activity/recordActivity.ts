import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import {
  DeviceMotion,
  DeviceMotionAccelerationData
} from '@ionic-native/device-motion';

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

  public segmentSteps;
  public totalSteps = 0;
  public segmentDistance;
  public totalDistance;
  public segmentCalories;
  public totalCalories;

  public currentSpeed;

  public subscription;

  public frequency = 10;

  public xAcceleration;
  public yAcceleration;
  public zAcceleration;

  public velocityInitial;
  public velocityFinal;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    private deviceMotion: DeviceMotion,
    public alertCtrl: AlertController
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
    // this.pedometerStart();
    this.startWatchAcceleration();

    this.startFlag = false;
    this.stateButton = 'Pause';
    this.pauseFlag = true;
  }

  //Pauses user activity and changes UI elements
  pauseActivity() {
    clearInterval(this.timer_id_active);
    this.stopWatchAcceleration();
    // this.pedometer.stopPedometerUpdates();

    this.totalTime += this.activeTime;

    this.pauseFlag = false;
    this.stateButton = 'Resume';
    this.resumeFlag = true;
  }

  //Resumes user activity and changes UI elements
  resumeActivity() {
    this.resumeTimer();
    this.startWatchAcceleration();

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

  //Starts pedometer tracking.
  // pedometerStart() {
  //   this.totalSteps = 0;
  //   this.pedometer
  //     .isDistanceAvailable()
  //     .then((available: boolean) =>
  //       console.log('Pedometer Available? ' + available)
  //     )
  //     .catch((error: any) => console.log(error));

  //   this.pedometer.startPedometerUpdates().subscribe(data => {
  //     this.segmentSteps = data.numberOfSteps;
  //     this.totalSteps = this.totalSteps + this.segmentSteps;
  //     console.log(data);
  //   });
  // }

  //Get's the current accelleration of the device in the x, y, and z axis.
  getCurrentAcceleration() {
    this.deviceMotion
      .getCurrentAcceleration()
      .then(
        (acceleration: DeviceMotionAccelerationData) =>
          console.log(acceleration),
        (error: any) => console.log(error)
      );
  }

  //Watches and subscribes an object to keep track of a device's acceleration.
  startWatchAcceleration() {
    //Sets the frequency variable to capture the acceleration data to every 40ms.
    var frequency = { frequency: 1000 };

    this.subscription = this.deviceMotion
      .watchAcceleration(frequency)
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        this.xAcceleration = 0;
        this.yAcceleration = 0;
        this.zAcceleration = 0;

        this.xAcceleration = acceleration.x;
        this.yAcceleration = acceleration.y;
        this.zAcceleration = acceleration.z;

        console.log(acceleration);

        console.log('X Acceleration: ' + this.xAcceleration);
        console.log('Y Acceleration: ' + this.yAcceleration);
        console.log('Z Acceleration: ' + this.zAcceleration);
      });
  }

  stopWatchAcceleration() {
    this.subscription.unsubscribe();
  }

  //TODO: Calculate user's current speed.
  getCurrentSpeed() {
    this.velocityInitial = this.velocityFinal;
    this.velocityFinal = this.velocityInitial + this.xAcceleration * 0.04;
    console.log('Current Velocity: ' + this.velocityFinal + ' m/s');
  }

  //TODO: Calculate user's current activity distance.
  getDistanceTraveled() {}

  //TODO: Calculate user's calories burned.
  getCaloriesBurned() {}

  //Ends user activity and changes UI elements
  endActivity() {
    clearInterval(this.timer_id_active);
    this.stopWatchAcceleration();
    this.activityTimer = '00:00:00';
    this.totalTime = 0;

    this.resumeFlag = false;
    this.pauseFlag = false;
    this.stateButton = 'Start';
    this.startFlag = true;
  }
}
