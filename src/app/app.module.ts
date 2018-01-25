import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { WheelSelector } from '@ionic-native/wheel-selector'

import { MyApp } from './app.component';
import { LoginPage } from '../pages/Login/login';
import { CreateAccountPage } from '../pages/Create Account/createAccount';
import { SplashPage } from '../pages/Splash/splash';
import { CreateAccountNamePage } from '../pages/Create Account - Name/createAccountName';
import { CreateAccountEmailPage } from '../pages/Create Account - Email/createAccountEmail';
import { CreateAccountPasswordPage } from '../pages/Create Account - Password/createAccountPassword';
import { CreateAccountBirthdatePage } from '../pages/Create Account - Birthdate/createAccountBirthdate';
import { CreateAccountPhysicalPage } from '../pages/Create Account - Physical Data/createAccountPhysical';
import { CreateAccountFinishPage } from '../pages/Create Account - Finish/createAccountFinish';
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
import { CreditsPage } from '../pages/Credits/credits';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CreateAccountPage,
    SplashPage,
    LoginPage,
    CreateAccountNamePage,
    CreateAccountEmailPage,
    CreateAccountPasswordPage,
    CreateAccountBirthdatePage,
    CreateAccountPhysicalPage,
    CreateAccountFinishPage,
    PasswordResetPage,
    HomePage,
    ReportPage,
    RecordActivityPage,
    ActivityHistoryPage,
    AchievementsPage,
    TrailMapPage,
    AccountStatisticsPage,
    AccountDetailsPage,
    AboutPage,
    CreditsPage
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CreateAccountPage,
    SplashPage,
    LoginPage,
    CreateAccountNamePage,
    CreateAccountEmailPage,
    CreateAccountPasswordPage,
    CreateAccountBirthdatePage,
    CreateAccountPhysicalPage,
    CreateAccountFinishPage,
    PasswordResetPage,
    HomePage,
    ReportPage,
    RecordActivityPage,
    ActivityHistoryPage,
    AchievementsPage,
    TrailMapPage,
    AccountStatisticsPage,
    AccountDetailsPage,
    AboutPage,
    CreditsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    File,
    Transfer,
    Camera,
    FilePath,
    NativeStorage,
    Facebook,
    WheelSelector,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
