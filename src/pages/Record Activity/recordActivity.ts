import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

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

  public activeTime = 0;
  public totalTime = 0;

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

  public initialMap;
  public subscriptionMap;
  public subscriptionSpeed;
  public mphString = '0';
  public lat1 = 0;
  public lat2 = 0;
  public lng1 = 0;
  public lng2 = 0;
  public counter = 0;

  public totalDistance = 0;
  public totalDistanceString = '0.00';
  public segmentCalories;
  public totalCalories;

  public data;

  public userId = '12345';
  public activityId = '';

  // // Implement when we have the userId saved to local storage
  // public userId = this.storage.get('userId').then(val => {
  //   this.userId = val;
  // });

  public icon = {
    url: 'http://www.robotwoods.com/dev/misc/bluecircle.png',
    size: new google.maps.Size(22, 22),
    point: new google.maps.Point(0, 18),
    points: new google.maps.Point(11, 11)
  };

  public marker = new google.maps.Marker({
    map: this.map,
    icon: this.icon
  });

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public storage: Storage,
    public platform: Platform,
    public http: Http
  ) {}

  //Code which is ran after the page is loaded
  ionViewWillEnter() {
    this.loadMap();
    this.watchLocation();
  }

  //Code which will run before the user leaves the page
  ionViewCanLeave(): boolean {
    // here we can either return true or false
    // depending on if we want to leave this view
    if (this.activeTime === 0 && this.totalTime === 0) {
      this.endWatchMap();
      return true;
    } else {
      //TODO: Display action sheet asking if they'd like to continue their run, end and save activity, or end and discard activity.
      this.presentLeaveActionSheet();
      this.menuCtrl.toggle();
      return false;
    }
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
  // Watches the user's location and updates map and location icon
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

  // Presents an action sheet to the user when they try to leave page without ending activity.
  presentLeaveActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'You are currently tracking an activity. Please choose an option.',
      buttons: [
        {
          text: 'Discard Activity and End',
          role: 'destructive',
          handler: () => {
            this.endActivity();
            this.activityDiscardEndAlert();
            console.log('Discard Activity');
          }
        },
        {
          text: 'Save Activity and End',
          handler: () => {
            // Pauses activity
            this.pauseActivity();

            // Save activity results to local storage
            this.saveActivity();

            // Presents alert to user
            this.activitySaveEndAlert();

            // Ends user activity
            this.endActivity();
            console.log('Save Activity');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // Presents an action sheet to the user when they try to end an activity.
  presentEndActivityActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'This will end your current activity. Please choose and option.',
      buttons: [
        {
          text: 'Discard Activity and End',
          role: 'destructive',
          handler: () => {
            this.endActivity();
            this.activityDiscardEndAlert();
            console.log('Discard Activity');
          }
        },
        {
          text: 'Save Activity and End',
          handler: () => {
            // Pauses activity
            this.pauseActivity();

            // Save activity results to local storage
            this.saveActivity();

            // Presents alert to user
            this.activitySaveEndAlert();

            // Ends user activity
            this.endActivity();
            console.log('Save Activity');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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
    this.getActivityId();

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
      this.subscriptionSpeed = this.geolocation
        .watchPosition(options)
        .subscribe(position => {
          tempSpeed = position.coords.speed;
          this.lat1 = position.coords.latitude;
          this.lng1 = position.coords.longitude;
          this.getActivityId();
          this.reportUserLocation(this.lat1, this.lng1);
          if (tempSpeed < 0) {
            tempSpeed = 0;
          }
          tempSpeed = tempSpeed * 2.23694;
          tempSpeed = Math.round(tempSpeed);
          this.mphString = tempSpeed.toString();
          console.log('Lat 1' + this.lat1);
          console.log('Lng 1' + this.lng1);
          // Doesn't run the calculation and outputs to display on first data gathered.
          if (this.counter > 0) {
            let segmentDistance = 0;
            segmentDistance = this.calculateDistance(
              this.lat1,
              this.lat2,
              this.lng1,
              this.lng2
            );
            this.lat2 = this.lat1;
            this.lng2 = this.lng1;

            console.log('Segment Distance: ' + segmentDistance);

            this.totalDistance += segmentDistance;
            console.log('Total Distance: ' + this.totalDistance);

            this.totalDistanceString = this.totalDistance.toFixed(2);
            console.log('Total Distance String: ' + this.totalDistanceString);
          } else {
            this.counter++;
            this.lat2 = this.lat1;
            this.lng2 = this.lng1;
            console.log('Lat 2' + this.lat2);
            console.log('Lng 2' + this.lng2);
            console.log(this.counter);
          }
        });
    });
  }

  endWatchCurrentSpeed() {
    this.subscriptionSpeed.unsubscribe();
  }

  endWatchMap() {
    this.subscriptionMap.unsubscribe();
  }

  //Calculates distance between two points using the haversine formula
  calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {
    let p = 0.017453292519943295; // Math.PI / 180
    let a =
      0.5 -
      Math.cos((lat1 - lat2) * p) / 2 +
      Math.cos(lat2 * p) *
        Math.cos(lat1 * p) *
        (1 - Math.cos((long1 - long2) * p)) /
        2;
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
    this.activeTime = 0;
    this.mphString = '0';
    this.totalDistanceString = '0.00';
    this.counter = 0;
    this.activityId = '';

    this.resumeFlag = false;
    this.pauseFlag = false;
    this.stateButton = 'Start';
    this.startFlag = true;
  }

  // TODO: Saves session user activity data to local storage
  saveActivity() {
    console.log('Activity Data Saved To Local Storage');
  }

  //Presents a modal alert to the user when they end their activity and save.
  activitySaveEndAlert() {
    let alert = this.alertCtrl.create({
      title: 'Activity Ended',
      subTitle: 'Your activity has been saved!',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Presents a modal alert to the user when they end their activity and discard.
  activityDiscardEndAlert() {
    let alert = this.alertCtrl.create({
      title: 'Activity Ended',
      subTitle: 'Your activity has been discarded!',
      buttons: ['Ok']
    });
    alert.present();
  }

  reportUserLocation(lat, lng) {
    var currentTime = new Date();
    console.log(currentTime);
    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/track_location.php';
    var myData = JSON.stringify({
      userId: this.userId,
      activityId: this.activityId,
      currentTime: currentTime,
      lat: lat,
      lng: lng
    });

    this.http.post(link, myData).subscribe(
      data => {
        this.data.response = data['_body'];
      },
      error => {
        console.log('Oooops!');
      }
    );
  }

  getActivityId() {
    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/track_location.php';
    var myData = JSON.stringify({
      userId: this.userId,
      activityId: this.activityId
    });

    this.http.post(link, myData).subscribe(
      data => {
        this.data.response = data['_body'];
        this.activityId = this.data.response.activityId;
      },
      error => {
        console.log('Oooops!');
      }
    );
  }
}
