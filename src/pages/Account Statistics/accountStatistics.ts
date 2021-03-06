import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@Component({
  selector: 'page-accountStatistics',
  templateUrl: 'accountStatistics.html'
})
export class AccountStatisticsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public storage: Storage
  ) {
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
    totalCaloriesWalking: '0',
    totalCaloriesRunning: '0',
    totalCaloriesCycling: '0',
    totalCaloriesBurned: '0',
    hazardsReported: '0',
    hazardsRemoved: '0',
    response: ''
  };

  ionViewWillEnter() {
    this.getUserStatistics();
  }

  // Sends the UserId to the server and receives the activity statistics returned
  getUserStatistics() {
    console.log('getUserStatistics Called');
    var link =
      'http://52.227.182.243/Mobile_Connections/get_statistics.php';
    var myData = JSON.stringify({
      userId: this.userStatisticData.userId
    });
    console.log('Calling post');
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

        if (rawReturn.totalCalories_Walking === null) {
          this.userStatisticData.totalCaloriesWalking = '0';
        } else {
          this.userStatisticData.totalCaloriesWalking =
            rawReturn.totalCalories_Walking;
          this.userStatisticData.totalCaloriesWalking = this.userStatisticData.totalCaloriesWalking.match(
            /^-?\d+(?:\.\d{0,2})?/
          )[0];
        }

        if (rawReturn.totalCalories_Running === null) {
          this.userStatisticData.totalCaloriesRunning = '0';
        } else {
          this.userStatisticData.totalCaloriesRunning =
            rawReturn.totalCalories_Running;
          this.userStatisticData.totalCaloriesRunning = this.userStatisticData.totalCaloriesRunning.match(
            /^-?\d+(?:\.\d{0,2})?/
          )[0];
        }

        if (rawReturn.totalCalories_Biking === null) {
          this.userStatisticData.totalCaloriesCycling = '0';
        } else {
          this.userStatisticData.totalCaloriesCycling =
            rawReturn.totalCalories_Biking;
          this.userStatisticData.totalCaloriesCycling = this.userStatisticData.totalCaloriesCycling.match(
            /^-?\d+(?:\.\d{0,2})?/
          )[0];
        }

        if (rawReturn.totalCalories_Overall === null) {
          this.userStatisticData.totalCaloriesBurned = '0';
        } else {
          this.userStatisticData.totalCaloriesBurned =
            rawReturn.totalCalories_Overall;
          this.userStatisticData.totalCaloriesBurned = this.userStatisticData.totalCaloriesBurned.match(
            /^-?\d+(?:\.\d{0,2})?/
          )[0];
        }

        if (rawReturn.hazards_reported === null) {
          this.userStatisticData.hazardsReported = '0';
        } else {
          this.userStatisticData.hazardsReported = rawReturn.hazards_reported;
        }

        if (rawReturn.hazards_removed === null) {
          this.userStatisticData.hazardsRemoved = '0';
        } else {
          this.userStatisticData.hazardsRemoved = rawReturn.hazards_removed;
        }
      },
      error => {
        console.log('Oooops!');
      }
    );
  }
}
