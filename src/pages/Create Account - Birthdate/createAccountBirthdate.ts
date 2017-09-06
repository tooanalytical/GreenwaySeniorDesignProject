import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateAccountPhysicalPage } from '../Create Account - Physical Data/createAccountPhysical';



@Component({
  selector: 'page-createAccountBirthdate',
  templateUrl: 'createAccountBirthdate.html'
})
export class CreateAccountBirthdatePage {

birthDate: String = new Date().toISOString();

  constructor(public navCtrl: NavController) {

  }

  createAccountNext(){
    this.navCtrl.push(CreateAccountPhysicalPage);
  }

}
