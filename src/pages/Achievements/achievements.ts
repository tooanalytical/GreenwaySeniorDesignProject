import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html'
})
export class AchievementsPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) { }



  ach1Flag = true;
  ach2Flag = false;
  ach3Flag = true;
  ach4Flag = true;
  ach5Flag = true;
  ach6Flag = false;
  ach7Flag = false;
  ach8Flag = true;
  ach9Flag = true;
  ach10Flag = true;
  ach11Flag = true;

  showAch1() {

    if (this.ach1Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Starting Strong',
        subTitle: 'You went for your first run!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Starting Strong',
        subTitle: 'To earn this badge, go for your first run!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch2() {

    if (this.ach2Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Push It to the Limit',
        subTitle: 'You ran faster than 7 Miles Per Hour!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Push It to the Limit',
        subTitle: 'For this badge, pick up the pace to 7 Miles Per Hour!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch3() {

    if (this.ach3Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Stop and Smell the Roses',
        subTitle: 'You walked for over two hours!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Stop and Smell the Roses',
        subTitle: 'To unlock this, enjoy your walk for over two hours!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch4() {

    if (this.ach4Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Nomad',
        subTitle: 'You walked for over 2 miles!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Nomad',
        subTitle: 'Unlock this badge by walking over 2 hours!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch5() {

    if (this.ach5Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Trail Fanatic',
        subTitle: 'You visited the trails every day for a week!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Trail Fanatic',
        subTitle: 'To unlock this badge, visit Rivergreenway every day for a week!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch6() {

    if (this.ach6Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Wheels of Steel',
        subTitle: 'You cycled for over 3 hours!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Wheels of Steel',
        subTitle: 'For this badge, cycle for over 3 hours in one go!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch7() {

    if (this.ach7Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Burning Rubber',
        subTitle: 'You cycled over 20 miles per hour!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Burning Rubber',
        subTitle: 'Pick up the pace, and cycle faster that 20 mph!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch8() {

    if (this.ach8Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'The Long Haul',
        subTitle: 'You cycled for more than 25 miles!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'The Long Haul',
        subTitle: 'Complete the long haul and cycle for more than 25 miles to earn this badge!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch9() {

    if (this.ach9Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Neighborhood Watch',
        subTitle: 'You submitted 3 problem tickets!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Neighborhood Watch',
        subTitle: 'Turn in 3 problem tickets to earn this badge!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch10() {

    if (this.ach10Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Wayfinder',
        subTitle: 'You"ve navigated the entire trail system!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Wayfinder',
        subTitle: 'To earn this badge, visit the entire Rivergreenway System!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch11() {

    if (this.ach11Flag == true) {
      let alert = this.alertCtrl.create({
        title: 'Feel the Burn',
        subTitle: 'You burned over 500 calories in one activity!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Feel the Burn',
        subTitle: 'Get fit and burn more than 500 calories in one activity to earn this badge!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
}

