import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ActivityDetailsPage } from '../Activity Details/activityDetails';

@Component({
  selector: 'page-activityHistory',
  templateUrl: 'activityHistory.html'
})
export class ActivityHistoryPage {
  data: Array<any>;
  activityData = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public storage: Storage
  ) {}

  public userId = this.storage.get('userId').then(val => {
    this.userId = val;
  });

  ionViewWillEnter() {
    this.getActivityHistoryList();
  }

  // Gets a list of activities performed by the user by sending the userId and receiving Date and activity type.
  getActivityHistoryList() {
    console.log('getActivityHistory() called');
    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/get_activity_history.php';
    var myData = JSON.stringify({
      userId: this.userId
    });
    console.log('Calling post...');
    this.http.post(link, myData).subscribe(data => {
      var response = data['_body'];

      this.data = JSON.parse(response);

      for (let activity in this.data) {
        if (this.data[activity].activityType == '1') {
          this.data[activity].activityType = 'Running';
        } else if (this.data[activity].activityType == '2') {
          this.data[activity].activityType = 'Walking';
        } else if (this.data[activity].activityType == '3') {
          this.data[activity].activityType = 'Cycling';
        }
      }
    });
  }

  // Captures user's activity selection and presents new activity details page with that data
  activitySelected(event, activity) {
    console.log('Activity Selected called');
    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/get_activity_info.php';
    var myData = JSON.stringify({
      activityId: activity.activityId
    });
    console.log('Calling post...');
    this.http.post(link, myData).subscribe(data => {
      var response = data['_body'];

      this.activityData = JSON.parse(response);

      this.navCtrl.push(ActivityDetailsPage, {
        activityData: this.activityData
      });
    });
  }
}
