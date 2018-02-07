import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-accountDetails',
  templateUrl: 'accountDetails.html'
})
export class AccountDetailsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.getUserInfo();
  }

  userName;
  emailAddress;
  userHeight;
  userWeight;
  userBirthdate;
  userGender;

  getUserInfo() {
    this.storage.get('fullName').then(val => {
      this.userName = val;
    });
    this.storage.get('email').then(val => {
      this.emailAddress = val;
    });
    this.storage.get('userHeight').then(val => {
      this.userHeight = val;
    });
    this.storage.get('userWeight').then(val => {
      this.userWeight = val;
    });
    this.storage.get('userBirthdate').then(val => {
      this.userBirthdate = val;
      this.userBirthdate = new Date(val).toDateString();
    });
    this.storage.get('userGender').then(val => {
      this.userGender = val;
    });
  }

  doStuff(){
    let alert = this.alertCtrl.create({
      title: 'Edit Information',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'email',
          placeholder: 'Email'
        },
        {
          name: 'height',
          placeholder: 'Height'
        },
        {
          name: 'weight',
          placeholder: 'Weight'
        },
        {
          name: 'gender',
          placeholder: 'Gender'
        }
      ],
      buttons: [
        {
          text: 'Confirm Changes',
          role: 'confirm',
          handler: data => {
            
          }
        }
      ]
    });
    alert.present();
  }
}
