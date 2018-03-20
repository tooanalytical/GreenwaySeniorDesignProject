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
  public timer_id_caloric;
  public startFlag = true;
  public pauseFlag = false;
  public resumeFlag = false;
  public typeFlag = false;

  // Button Color Variables
  public startButtonColor: string = '#37721b'; //Light Green
  public resumeButtonColor: string = '#37721b'; //Light Green
  public pauseButtonColor: string = '#ff0000'; //Red
  public endButtonColor: string = '#ff0000'; //Red

  // Map Variables
  public initialMap;
  public subscriptionMap;
  public subscriptionSpeed;

  // Speed Variables
  public tempSpeed = 0;
  public mphString = '0';

  // User Position Variables
  public lat1 = 0;
  public lat2 = 0;
  public lng1 = 0;
  public lng2 = 0;
  public counter = 0;

  // Distance Variables
  public totalDistance = 0;
  public totalDistanceString = '0.00';

  // Calories Variables
  public totalCalories = 0;
  public totalCaloriesString = '0';

  //Activity Type Variable
  public activityTypeNum = '';

  public metScore = 0;

  public userWeight = 0;
  public userHeight = 0;

  public userHeightString = this.storage.get('userHeight').then(val => {
    this.userHeightString = val;
  });

  public userWeightString = this.storage.get('userWeight').then(val => {
    this.userWeightString = val;
  });

  data: any = {};

  public activityIdResponse = {};

  public currentActivityId = '';

  // JSON Object used to save data sent to local storage and database.
  public activityData = {
    userId: this.storage.get('userId').then(val => {
      this.activityData.userId = val;
    }),
    activityId: this.currentActivityId,
    totalDuration: this.activityTimer,
    totalDistance: this.totalDistanceString,
    totalCalories: this.totalCaloriesString,
    activityType: this.activityTypeNum
  };

  // Icon on map displaying user's current location
  public icon = {
    url:
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/userpositionIcon.png',
    size: new google.maps.Size(22, 22),
    point: new google.maps.Point(0, 18),
    points: new google.maps.Point(11, 11)
  };

  // Marker object containing icon of user's location
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
  ) {
    this.data.response = '';
    this.http = http;
  }

  //Code which is ran after the page is loaded
  ionViewWillEnter() {
    this.loadMap();
    this.watchLocation();

    //Converting the user height and weight to integers for calculating calories burned.
    this.userHeight = this.convertHeightStringToInteger(this.userHeightString);
    this.userWeight = this.convertWeightStringToInteger(this.userWeightString);
    //Converts User Weight from pounds to kilograms
    this.userWeight = this.userWeight * 0.45359237;
  }

  //Code which will run before the user leaves the page
  ionViewCanLeave(): boolean {
    // here we can either return true or false
    // depending on if we want to leave this view
    if (this.activeTime === 0 && this.totalTime === 0) {
      this.endWatchMap();
      return true;
    } else {
      this.presentLeaveActionSheet();
      this.menuCtrl.toggle();
      return false;
    }
  }

  selectTypeWalk(){
    let alert = this.alertCtrl.create({
      title: 'Confirm Selection',
      subTitle: 'Would you like to go walking?',
      buttons: [{
        text: 'Yes',
        handler: ()=>{
          this.activityData.activityType = '1';
          this.typeFlag = true;
        }
      },{
        text:'No',
        handler: ()=>{
          this.typeFlag = false;
          this.navCtrl.setRoot(RecordActivityPage);
        }
      }]
    });
    alert.present();
  }
  selectTypeRun(){
    let alert = this.alertCtrl.create({
      title: 'Confirm Selection',
      subTitle: 'Would you like to go running?',
      buttons: [{
        text: 'Yes',
        handler: ()=>{
          this.activityData.activityType='2';
          this.typeFlag = true;
        }
      },{
        text:'No',
        handler: ()=>{
          this.typeFlag = false;
          this.navCtrl.setRoot(RecordActivityPage);
        }
      }]
    });
    alert.present();
  }
  selectTypeBike(){
    let alert = this.alertCtrl.create({
      title: 'Confirm Selection',
      subTitle: 'Would you like to go cycling?',
      buttons: [{
        text: 'Yes',
        handler: ()=>{
          this.activityData.activityType='3';
          this.typeFlag = true;
        }
      },{
        text:'No',
        handler: ()=>{
          this.typeFlag = false;
          this.navCtrl.setRoot(RecordActivityPage);
        }
      }]
    });
    alert.present();
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
            this.deleteActivity();
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
            this.saveActivity().then(data => {
              // Presents alert to user
              this.activitySaveEndAlert();

              // Ends user activity
              this.endActivity();
            });
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
            this.deleteActivity();
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
            this.saveActivity().then(data => {
              // Presents alert to user
              this.activitySaveEndAlert();

              // Ends user activity
              this.endActivity();
            });
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
    this.getActivityId().then(data => {
      this.startTimer();
      this.watchCurrentSpeed();
      this.updateCaloriesBurned();

      this.startFlag = false;
      this.stateButton = 'Pause';
      this.pauseFlag = true;
    });
  }

  //Pauses user activity and changes UI elements
  pauseActivity() {
    clearInterval(this.timer_id_active);
    clearInterval(this.timer_id_caloric);
    this.endWatchCurrentSpeed();
    this.activityData.totalDuration = this.activityTimer;
    this.activityData.totalDistance = this.totalDistanceString;
    this.activityData.totalCalories = this.totalCaloriesString;
    console.log('UserID on Pause: ' + this.activityData.userId);
    console.log('ActivityID on Pause: ' + this.activityData.activityId);
    console.log('TotalDuration on Pause: ' + this.activityData.totalDuration);
    console.log('TotalDistance on Pause: ' + this.activityData.totalDistance);
    console.log('TotalCalories on Pause: ' + this.activityData.totalCalories);

    this.totalTime += this.activeTime;

    this.pauseFlag = false;
    this.stateButton = 'Resume';
    this.resumeFlag = true;
  }

  //Resumes user activity and changes UI elements
  resumeActivity() {
    this.resumeTimer();
    this.watchCurrentSpeed();
    this.updateCaloriesBurned();

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
      this.subscriptionSpeed = this.geolocation
        .watchPosition(options)
        .subscribe(position => {
          this.tempSpeed = position.coords.speed;
          this.lat1 = position.coords.latitude;
          this.lng1 = position.coords.longitude;

          this.reportUserLocation(this.lat1, this.lng1);
          if (this.tempSpeed < 0) {
            this.tempSpeed = 0;
          }
          this.tempSpeed = this.tempSpeed * 2.23694;
          this.tempSpeed = Math.round(this.tempSpeed);
          this.mphString = this.tempSpeed.toString();
          console.log('mphString: ' + this.mphString);
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
  updateCaloriesBurned() {
    this.timer_id_caloric = setInterval(() => {
      // Sets the MET score of the activity during the interval
      this.setMetScore();
      console.log('MetScore: ' + this.metScore);
      console.log('User Weight: ' + this.userWeight);

      //TODO: Calculate calories burned during the interval of time based upon (METs * weight(kg) * time (1/3600th of hour) = calories burned)
      var caloriesBurned = this.metScore * this.userWeight * 0.000277777778;

      this.totalCalories += caloriesBurned;
      console.log('Segment calories burned: ' + caloriesBurned);
      console.log('Total Calories burned: ' + this.totalCalories);
      this.totalCaloriesString = Math.round(this.totalCalories).toString();
      console.log('Total Calories burned string: ' + this.totalCaloriesString);
    }, 1000);
  }

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
    this.currentActivityId = '';
    this.metScore = 0;
    this.totalCalories = 0;
    this.totalCaloriesString = '0';

    this.resumeFlag = false;
    this.pauseFlag = false;
    this.stateButton = 'Start';
    this.startFlag = true;
    this.typeFlag = false;
  }

  // TODO: Saves session user activity data to local storage and database
  saveActivity(): Promise<any> {
    return new Promise((resolve, reject) => {
      // TODO: Save activity to database.
      console.log('Saving Activity Data to Database');
      var link =
        'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/end_activity.php';
      console.log('Calling post: ');
      console.log('Being sent to database: ' + this.activityData);
      this.http.post(link, this.activityData).subscribe(
        data => {
          this.data.response = data['_body'];
          return resolve(data);
        },
        error => {
          console.log('Oooops!');
          return reject(error);
        }
      );
      console.log('Activity Data Saved to Database');
    });
  }

  // Deletes an active activity's data from the database if the user discards the activity
  deleteActivity() {
    console.log('Deleting activity from database');
    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/delete_activity.php';

    console.log('Calling post: ');
    var myData = JSON.stringify({
      userId: this.activityData.userId,
      activityId: this.activityData.activityId
    });

    console.log(
      'USER ID IT IS SENDING UPON DELETE: ' + this.activityData.userId
    );

    this.http.post(link, myData).subscribe(
      data => {
        console.log('Success!');
      },
      error => {
        console.log('Oooops!');
      }
    );
    console.log('Activity Data Deleted from Database');
  }

  //Presents a modal alert to the user when they end their activity and save.
  activitySaveEndAlert() {
    let alert = this.alertCtrl.create({
      title: 'Activity Ended',
      subTitle: 'Your activity has been saved!',
      buttons: ['Ok']
    });
    alert.present();
    this.navCtrl.setRoot(RecordActivityPage);
  }

  //Presents a modal alert to the user when they end their activity and discard.
  activityDiscardEndAlert() {
    let alert = this.alertCtrl.create({
      title: 'Activity Ended',
      subTitle: 'Your activity has been discarded!',
      buttons: ['Ok']
    });
    alert.present();
    this.navCtrl.setRoot(RecordActivityPage);
  }

  // Sends the UserId, ActivityId, Curent Time, lat and lng to server.
  reportUserLocation(lat, lng) {
    var currentTime = new Date();
    console.log(currentTime);
    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/track_activity.php';
    var myData = JSON.stringify({
      userId: this.activityData.userId,
      activityId: this.currentActivityId,
      currentTime: currentTime,
      lat: lat,
      lng: lng
    });

    this.http.post(link, myData).subscribe(
      data => {
        console.log('Callback from reportUserLocation after sending: ' + data);
        this.data.response = data['_body'];
      },
      error => {
        console.log('Oooops!');
      }
    );
  }

  // Sends the UserId to the server and receives the activityId returned
  getActivityId(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('getActivityId Called');
      var link =
        'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/start_activity.php';
      var myData = JSON.stringify({
        userId: this.activityData.userId
      });
      console.log('Calling post');
      this.http.post(link, myData).subscribe(
        data => {
          this.data.response = data['_body'];
          this.currentActivityId = this.data.response;
          this.activityData.activityId = this.currentActivityId;
          return resolve(this.data.response);
        },
        error => {
          console.log('Oooops!');
          return reject(error);
        }
      );
    });
  }

  // Converts the user's height string to an integer in inches
  convertHeightStringToInteger(userHeight) {
    var tempHeight = '';
    for (var i = 0; i < userHeight.length; i++) {
      var c = userHeight.charAt(i);
      if (c.match(/[a-z]/i)) {
        continue;
      } else {
        if (userHeight.charAt(i) === ' ') {
          continue;
        } else {
          tempHeight = tempHeight.concat(c);
        }
      }
    }
    var height = 0;
    var inches = '';
    var d = '';
    for (var j = 0; j < tempHeight.length; j++) {
      d = tempHeight.charAt(j);
      if (height === 0) {
        height += 12 * parseInt(tempHeight.charAt(j));
      } else {
        if (tempHeight.charAt(j) !== ' ') {
          inches = inches.concat(d);
        }
      }
    }
    height += parseInt(inches);
    return height;
  }

  // Converts the user's weight string to an integer in pounds
  convertWeightStringToInteger(userWeight) {
    var tempWeight = '';
    for (var i = 0; i < userWeight.length; i++) {
      var c = userWeight.charAt(i);
      if (c.match(/[a-z]/i)) {
        continue;
      } else {
        tempWeight = tempWeight.concat(c);
      }
    }
    // Convert weight string to integer
    var weight = parseInt(tempWeight);
    return weight;
  }

  setMetScore() {
    // TODO: Modify to identify if the user is on foot or bike
    if (this.tempSpeed > 0 && this.tempSpeed <= 2) {
      this.metScore = 2.3;
    } else if (this.tempSpeed > 2 && this.tempSpeed <= 3) {
      this.metScore = 2.9;
    } else if (this.tempSpeed > 3 && this.tempSpeed <= 3.4) {
      this.metScore = 3.6;
    } else if (this.tempSpeed > 3.4 && this.tempSpeed <= 4) {
      this.metScore = 4.1;
    } else if (this.tempSpeed > 4 && this.tempSpeed <= 5) {
      this.metScore = 8.7;
    } else if (this.tempSpeed > 5 && this.tempSpeed <= 6) {
      this.metScore = 10.2;
    } else if (this.tempSpeed > 6 && this.tempSpeed <= 7) {
      this.metScore = 11.7;
    } else if (this.tempSpeed > 7 && this.tempSpeed <= 8) {
      this.metScore = 13.3;
    } else if (this.tempSpeed > 8 && this.tempSpeed <= 9) {
      this.metScore = 14.8;
    } else if (this.tempSpeed > 9 && this.tempSpeed <= 10) {
      this.metScore = 16.3;
      // Now we're assuming they're on a bike unless they're an elite runner
    } else if (this.tempSpeed > 10 && this.tempSpeed <= 14) {
      this.metScore = 8.0;
    } else if (this.tempSpeed > 14 && this.tempSpeed <= 16) {
      this.metScore = 10.0;
    } else if (this.tempSpeed > 16 && this.tempSpeed <= 20) {
      this.metScore = 12.0;
    } else if (this.tempSpeed > 20) {
      this.metScore = 16.0;
    }
  }
}
