import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    public http: Http) {}

    feedback;
    response: '';
  submitFeedback(){
      
    let alert = this.alertCtrl.create({
      title: "Application Feedback",
      message: "Enter your concern with Viridian here",
      inputs:[
        {
          name: 'feedback',
          placeholder: 'Feedback'
        },
      ],
      buttons:[
        {
          text: 'Submit',
          handler: data => {
            var date = new Date();
            var time = date.getTime();
            console.log(time);
            var link =
              'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/send_feedback.php';
            var myData = JSON.stringify({
              currentTime: date,
              feedback: data.feedback
            });
            this.http.post(link, myData).subscribe(
              data => {
                this.response = data['_body'];
              },
              error => {
                console.log('Oooops!');
              }
            );
            this.navCtrl.setRoot(FeedbackPage);
          }
        },
        {
          text: 'Cancel',
          handler: data =>{
            this.navCtrl.setRoot(FeedbackPage);
          }
        }
      ]
    });
    alert.present();
  }
}
