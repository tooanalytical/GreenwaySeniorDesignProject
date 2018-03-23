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

          this.userStatisticData.totalDistanceWalking =
            rawReturn.totalDistance_Walking;
          this.userStatisticData.totalDistanceRunning =
            rawReturn.totalDistance_Running;
          this.userStatisticData.totalDistanceCycling =
            rawReturn.totalDistance_Biking;
          this.userStatisticData.totalDistanceTraveled =
            rawReturn.totalDistance_Overall;
          this.userStatisticData.totalCaloriesWalking =
            rawReturn.totalCalories_Walking;
          this.userStatisticData.totalCaloriesRunning =
            rawReturn.totalCalories_Running;
          this.userStatisticData.totalCaloriesCycling =
            rawReturn.totalCalories_Biking;
          this.userStatisticData.totalCaloriesBurned =
            rawReturn.totalCalories_Overall;
          this.userStatisticData.hazardsReported = rawReturn.hazards_reported;
          this.userStatisticData.hazardsRemoved = rawReturn.hazards_removed;

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
