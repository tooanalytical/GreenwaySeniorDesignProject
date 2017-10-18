import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from 'ionic-native';

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

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
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

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){

      GooglePlus.logout().then(() => {
          console.log("logged out");
      });

  }

  openPage(page) {
    if(page.component) {
        this.nav.setRoot(page.component);
    } else {
        // Since the component is null, this is the logout option
        // logout logic
        this.logout();

        // redirect to home
        this.nav.setRoot(SplashPage);
        }
    }


}
