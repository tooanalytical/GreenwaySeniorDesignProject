import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html'
})
export class AchievementsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public http: Http,
    public storage: Storage
  ) { }

  startingStrong;
  pushIt;
  stopSmellRoses;
  nomad;
  trailFanatic;
  wheelsOfSteel;
  burningRubber;
  longHaul;
  neighborhoodWatch;
  wayfinder;
  feelBurn;

  public userId = this.storage.get('userId').then(val => {
    this.userId = val;
  });

  data: Array<any>;

  setBools() {

    var link =
      'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/check_achievements.php';
    var myData = JSON.stringify({
      userId: this.userId
    });
    console.log(myData);
    this.http.post(link, myData).subscribe(data => {
      var response = data['_body'];
      this.data = JSON.parse(response);
       
      this.startingStrong = this.data["startingStrong"];
      this.pushIt = this.data["pushIt"];
      this.stopSmellRoses = this.data["stopSmellRoses"];
      this.nomad = this.data["nomad"];
      this.trailFanatic = this.data["trailFanatic"];
      this.wheelsOfSteel = this.data["wheelsOfSteel"];
      this.burningRubber = this.data["burningRubber"];
      this.longHaul = this.data["longHaul"];
      this.neighborhoodWatch = this.data["neighborhoodWatch"];
      this.wayfinder = this.data["wayfinder"];
      this.feelBurn = this.data["feelBurn"];
      
    });
  }

  ionViewWillEnter(){
    this.setBools();
  }

  showAch1() {
    if (this.startingStrong == true) {
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
    if (this.pushIt == true) {
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
    if (this.stopSmellRoses == true) {
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
    if (this.nomad == true) {
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
    if (this.trailFanatic == true) {
      let alert = this.alertCtrl.create({
        title: 'Trail Fanatic',
        subTitle: 'You visited the trails every day for a week!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Trail Fanatic',
        subTitle:
          'To unlock this badge, visit Rivergreenway every day for a week!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch6() {
    if (this.wheelsOfSteel == true) {
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
    if (this.burningRubber == true) {
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
    if (this.longHaul == true) {
      let alert = this.alertCtrl.create({
        title: 'The Long Haul',
        subTitle: 'You cycled for more than 25 miles!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'The Long Haul',
        subTitle:
          'Complete the long haul and cycle for more than 25 miles to earn this badge!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
  showAch9() {
    if (this.neighborhoodWatch == true) {
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
    if (this.wayfinder == true) {
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
    if (this.feelBurn == true) {
      let alert = this.alertCtrl.create({
        title: 'Feel the Burn',
        subTitle: 'You burned over 500 calories in one activity!',
        buttons: ['Congratulations!']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Feel the Burn',
        subTitle:
          'Get fit and burn more than 500 calories in one activity to earn this badge!',
        buttons: ['Ok!']
      });
      alert.present();
    }
  }
}
