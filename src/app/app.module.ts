import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { SplashPage } from '../pages/Splash/splash';
import { LoginPage } from '../pages/Login/login';
import { CreateAccountNamePage } from '../pages/Create Account - Name/createAccountName';
import { CreateAccountEmailPage } from '../pages/Create Account - Email/createAccountEmail';
import { CreateAccountPasswordPage } from '../pages/Create Account - Password/createAccountPassword';
import { CreateAccountBirthdatePage } from '../pages/Create Account - Birthdate/createAccountBirthdate';
import { CreateAccountPhysicalPage } from '../pages/Create Account - Physical Data/createAccountPhysical';
import { PasswordResetPage } from '../pages/Password Reset/passwordReset';
import { HomePage } from '../pages/home/home';
import { ReportPage } from '../pages/Report Problem/report';
import { RecordActivityPage } from '../pages/Record Activity/recordActivity';
import { ActivityHistoryPage } from '../pages/Activity History/activityHistory';
import { AchievementsPage } from '../pages/Achievements/achievements';
import { TrailMapPage } from '../pages/Trail Map/trailMap';
import { AccountStatisticsPage } from '../pages/Account Statistics/accountStatistics';
import { AccountDetailsPage } from '../pages/Account Details/accountDetails';
import { AboutPage } from '../pages/About/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    LoginPage,
    CreateAccountNamePage,
    CreateAccountEmailPage,
    CreateAccountPasswordPage,
    CreateAccountBirthdatePage,
    CreateAccountPhysicalPage,
    PasswordResetPage,
    HomePage,
    ReportPage,
    RecordActivityPage,
    ActivityHistoryPage,
    AchievementsPage,
    TrailMapPage,
    AccountStatisticsPage,
    AccountDetailsPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    LoginPage,
    CreateAccountNamePage,
    CreateAccountEmailPage,
    CreateAccountPasswordPage,
    CreateAccountBirthdatePage,
    CreateAccountPhysicalPage,
    PasswordResetPage,
    HomePage,
    ReportPage,
    RecordActivityPage,
    ActivityHistoryPage,
    AchievementsPage,
    TrailMapPage,
    AccountStatisticsPage,
    AccountDetailsPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
