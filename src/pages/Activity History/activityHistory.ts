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

  //activityList = {};

  ionViewWillEnter() {
    this.getActivityHistoryList();
  }

  // Gets a list of activities performed by the user by sending the userId and receiving Date and activity type.
  getActivityHistoryList() {
    console.log('getActivityHistory() called');
    console.log('User Id: ' + this.userId);
    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/get_activity_history.php';
    var myData = JSON.stringify({
      userId: this.userId
    });
    console.log('Calling post...');
    this.http.post(link, myData).subscribe(data => {
      var response = data['_body'];
      console.log('Response: ' + response);

      this.data = JSON.parse(response);
      console.log('Now in Data Array: ' + this.data);
    });
  }

  // Captures user's activity selection and presents new activity details page with that data
  activitySelected(event, activity) {
    console.log('Activity selected');
    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/get_activity_info.php';
    var myData = JSON.stringify({
      activityId: activity.activityId
    });
    console.log('Activity Id being sent: ' + myData);
    console.log('Calling post...');
    this.http.post(link, myData).subscribe(data => {
      var response = data['_body'];
      console.log('Response: ' + response);

      this.activityData = JSON.parse(response);
      console.log('Now in Data Array: ' + this.activityData);

      this.navCtrl.push(ActivityDetailsPage, {
        activityData: this.activityData
      });
      console.log(
        'What is being pushed to the next page: ' + this.activityData
      );
    });
  }
}
