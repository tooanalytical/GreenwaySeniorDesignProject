import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { CreateAccountPasswordPage } from '../Create Account - Password/createAccountPassword';

@Component({
  selector: 'page-createAccountEmail',
  templateUrl: 'createAccountEmail.html'
})
export class CreateAccountEmailPage {
firstName: string = this.navParams.get('firstName');
lastName: string = this.navParams.get('lastName');
emailAddress;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  createAccountNext(){
    this.navCtrl.push(CreateAccountPasswordPage);
  }



}
