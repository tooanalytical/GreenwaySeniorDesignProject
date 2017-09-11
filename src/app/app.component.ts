import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
<<<<<<< HEAD
=======
import { SplashPage } from '../pages/Splash/splash';
>>>>>>> 42888908b03d272efdc2bf76bd948bdfa073f0a3
import { LoginPage } from '../pages/Login/login';
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

<<<<<<< HEAD
  rootPage: any = LoginPage;
=======
  rootPage: any = SplashPage;
>>>>>>> 42888908b03d272efdc2bf76bd948bdfa073f0a3

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: HomePage, icon: "ios-apps-outline" },
      { title: 'Report Problem', component: ReportPage, icon: "ios-warning-outline" },
      { title: 'Record Activity', component: RecordActivityPage, icon: "ios-walk-outline" },
      { title: 'Activity History', component: ActivityHistoryPage, icon: "ios-list-box-outline" },
      { title: 'Achievements', component: AchievementsPage, icon: "ios-star-outline" },
      { title: 'Trail Map', component: TrailMapPage, icon: "ios-map-outline" },
      { title: 'Account Statistics', component: AccountStatisticsPage, icon: "ios-stats-outline" },
      { title: 'Account Details', component: AccountDetailsPage, icon: "ios-contact" },
      { title: 'About', component: AboutPage, icon: "ios-information-circle-outline" },
<<<<<<< HEAD
      { title: 'Logout', component: LoginPage, icon: "ios-exit-outline" }
=======
      { title: 'Logout', component: SplashPage, icon: "ios-exit-outline" }
>>>>>>> 42888908b03d272efdc2bf76bd948bdfa073f0a3
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
