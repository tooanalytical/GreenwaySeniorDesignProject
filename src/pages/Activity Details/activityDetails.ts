import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@Component({
  selector: 'page-activityDetails',
  templateUrl: 'activityDetails.html'
})
export class ActivityDetailsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public storage: Storage
  ) {}

  activityData = this.navParams.get('activityData');

  ionViewWillLoad() {
    this.convertActivityType();
  }

  convertActivityType() {
    if (this.activityData.activityType == '1') {
      this.activityData.activityType = 'Walking';
    } else if (this.activityData.activityType == '2') {
      this.activityData.activityType = 'Running';
    } else if (this.activityData.activityType == '3') {
      this.activityData.activityType = 'Cycling';
    }
  }
}
