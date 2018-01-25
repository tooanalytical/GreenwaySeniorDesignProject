import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { CreateAccountFinishPage } from '../Create Account - Finish/createAccountFinish';

@Component({
  selector: 'page-createAccountPhysical',
  templateUrl: 'createAccountPhysical.html'
})
export class CreateAccountPhysicalPage {
  constructor(public selector: WheelSelector, public navCtrl: NavController, public navParams: NavParams) {}

  firstName = this.navParams.get('firstName');
  lastName = this.navParams.get('lastName');
  emailAddress = this.navParams.get('emailAddress');
  userPassword = this.navParams.get('userPassword');
  userPasswordConfirm = this.navParams.get('userPasswordConfirm');
  userBirthdate = this.navParams.get('userBirthdate');

  data = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: this.emailAddress,
    userPassword: this.userPassword,
    userPasswordConfirm: this.userPasswordConfirm,
    userBirthdate: this.userBirthdate,
    userHeight: '',
    userWeight: ''
  };
  jsonData = {
  feet: [
   { description: "4 feet" },
    { description: "5 feet" },
    { description: "6 feet" },
    { description: "7 feet" }
  ],
  inches: [
    { description: "1 inch" },
    { description: "2 inches" },
    { description: "3 inches" },
    { description: "4 inches" },
    { description: "5 inches" },
    { description: "6 inches" },
    { description: "7 inches" },
    { description: "8 inches" },
    { description: "9 inches" },
    { description: "10 inches" },
    { description: "11 inches" }
  ]};

  createAccountNext() {
    this.navCtrl.push(CreateAccountFinishPage, this.data);
  }

  selectANumber() {
   this.selector.show({
     title: "How Many?",
     items: [
       this.jsonData.feet, this.jsonData.inches
     ],
   }).then(
     result => {
       console.log(result[0].description + ' at index: ' + result[0].index);
     },
     err => console.log('Error: ', err)
     );
 }

}
