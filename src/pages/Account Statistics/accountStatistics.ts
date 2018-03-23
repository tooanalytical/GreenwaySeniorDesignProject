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

  // Sends the UserId to the server and receives the activityId returned
  getUserStatistics(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('getUserStatistics Called');
      var link =
        'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/get_statistics.php';
      var myData = JSON.stringify({
        userId: this.userStatisticData.userId
      });
      console.log('Calling post');
      this.http.post(link, myData).subscribe(
        data => {
          var response = data['_body'];

          var rawReturn = JSON.parse(response);

          if (rawReturn.totalDistance_Walking == null) {
            this.userStatisticData.totalDistanceWalking = '0';
          } else {
            this.userStatisticData.totalDistanceWalking =
              rawReturn.totalDistance_Walking;
          }

          if (rawReturn.totalDistance_Running == null) {
            this.userStatisticData.totalDistanceRunning = '0';
          } else {
            this.userStatisticData.totalDistanceRunning =
              rawReturn.totalDistance_Running;
          }

          if (rawReturn.totalDistance_Biking == null) {
            this.userStatisticData.totalDistanceCycling = '0';
          } else {
            this.userStatisticData.totalDistanceCycling =
              rawReturn.totalDistance_Biking;
          }

          if (rawReturn.totalDistance_Overall == null) {
            this.userStatisticData.totalDistanceTraveled = '0';
          } else {
            this.userStatisticData.totalDistanceTraveled =
              rawReturn.totalDistance_Overall;
          }

          if (rawReturn.totalCalories_Walking == null) {
            this.userStatisticData.totalCaloriesWalking = '0';
          } else {
            this.userStatisticData.totalCaloriesWalking =
              rawReturn.totalCalories_Walking;
          }

          if (rawReturn.totalCalories_Running == null) {
            this.userStatisticData.totalCaloriesRunning = '0';
          } else {
            this.userStatisticData.totalCaloriesRunning =
              rawReturn.totalCalories_Running;
          }

          if (rawReturn.totalCalories_Biking == null) {
            this.userStatisticData.totalCaloriesCycling = '0';
          } else {
            this.userStatisticData.totalCaloriesCycling =
              rawReturn.totalCalories_Biking;
          }

          if (rawReturn.totalCalories_Overall == null) {
            this.userStatisticData.totalCaloriesBurned = '0';
          } else {
            this.userStatisticData.totalCaloriesBurned =
              rawReturn.totalCalories_Overall;
          }

          if (rawReturn.hazards_reported == null) {
            this.userStatisticData.hazardsReported = '0';
          } else {
            this.userStatisticData.hazardsReported = rawReturn.hazards_reported;
          }

          if (rawReturn.hazards_removed == null) {
            this.userStatisticData.hazardsRemoved = '0';
          } else {
            this.userStatisticData.hazardsRemoved = rawReturn.hazards_removed;
          }

          return resolve(response);
        },
        error => {
          console.log('Oooops!');
          return reject(error);
        }
      );
    });
  }
}
