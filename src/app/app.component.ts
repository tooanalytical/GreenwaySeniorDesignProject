import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from 'ionic-native';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';

import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/Splash/splash';
import { ReportPage } from '../pages/Report Problem/report';
import { RecordActivityPage } from '../pages/Record Activity/recordActivity';
import { ActivityHistoryPage } from '../pages/Activity History/activityHistory';
import { AchievementsPage } from '../pages/Achievements/achievements';
import { TrailMapPage } from '../pages/Trail Map/trailMap';
import { AccountStatisticsPage } from '../pages/Account Statistics/accountStatistics';
import { AccountDetailsPage } from '../pages/Account Details/accountDetails';
import { AboutPage } from '../pages/About/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SplashPage;

  pages: Array<{title: string, component: any, icon: string}>;

  user: any;
	userReady: boolean = false;

  constructor(public platform: Platform, public nativeStorage: NativeStorage, public statusBar: StatusBar, public splashScreen: SplashScreen, public fb: Facebook) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'DASHBOARD', component: HomePage, icon: "ios-apps-outline" },
      { title: 'REPORT PROBLEM', component: ReportPage, icon: "ios-warning-outline" },
      { title: 'RECORD ACTIVITY', component: RecordActivityPage, icon: "ios-walk-outline" },
      { title: 'ACTIVITY HISTORY', component: ActivityHistoryPage, icon: "ios-list-box-outline" },
      { title: 'ACHIEVEMENTS', component: AchievementsPage, icon: "ios-star-outline" },
      { title: 'TRAIL MAP', component: TrailMapPage, icon: "ios-map-outline" },
      { title: 'ACCOUNT STATISTICS', component: AccountStatisticsPage, icon: "ios-stats-outline" },
      { title: 'ACCOUNT DETAILS', component: AccountDetailsPage, icon: "ios-contact" },
      { title: 'ABOUT', component: AboutPage, icon: "ios-information-circle-outline" },
      { title: 'LOGOUT', component: null, icon: "ios-exit-outline" }
    ];

    platform.ready().then(() => {
        // Here we will check if the user is already logged into Facebook
        // because we don't want to ask users to log in each time they open the app
        let env = this;
        this.nativeStorage.getItem('user')
        .then( function (data) {
          // user is previously logged and we have his data
          // we will let him access the app
          env.nav.push(HomePage);
          env.splashScreen.hide();
        }, function (error) {
          //we don't have the user data so we will ask him to log in

          //Disabled this portion of FB login. May need to uncomment later.
          //env.nav.push(SplashPage);
          env.splashScreen.hide();
        });

        this.statusBar.styleDefault();
      });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ionViewCanEnter(){
		let env = this;
		this.nativeStorage.getItem('user')
		.then(function (data){
			env.user = {
				name: data.name,
				gender: data.gender,
				picture: data.picture
			};
				env.userReady = true;
		}, function(error){
			console.log(error);
		});
	}

  googleLogout(){

      GooglePlus.logout().then(() => {
          console.log("logged out");
      });

  }

  facebookLogout(){
		let env = this;
		this.fb.logout()
		.then(function(response) {
			//user logged out so we will remove him from the NativeStorage
			env.nativeStorage.remove('user');
		}, function(error){
			console.log(error);
		});
	}

  openPage(page) {
    if(page.component) {
        this.nav.setRoot(page.component);
    } else {
        // Since the component is null, this is the logout option
        // logout logic
        this.googleLogout();
        this.facebookLogout();

        // redirect to home
        this.nav.setRoot(SplashPage);
        }
    }


}
