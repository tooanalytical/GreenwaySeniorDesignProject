import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { Pedometer } from '@ionic-native/pedometer';
import { DeviceMotion } from '@ionic-native/device-motion';
import { Facebook } from '@ionic-native/facebook';
import { HttpModule } from '@angular/http';
import { Base64 } from '@ionic-native/base64';
import { OneSignal } from '@ionic-native/onesignal';
import { BackgroundMode } from '@ionic-native/background-mode';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Keyboard } from '@ionic-native/keyboard';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/Login/login';
import { SplashPage } from '../pages/Splash/splash';
import { CreateAccountNamePage } from '../pages/Create Account - Name/createAccountName';
import { CreateAccountEmailPage } from '../pages/Create Account - Email/createAccountEmail';
import { CreateAccountPasswordPage } from '../pages/Create Account - Password/createAccountPassword';
import { CreateAccountBirthdatePage } from '../pages/Create Account - Birthdate/createAccountBirthdate';
import { CreateAccountSocialBirthdatePage } from '../pages/Create Account - Social - Birthdate/createAccountSocialBirthdate';
import { CreateAccountPhysicalPage } from '../pages/Create Account - Physical Data/createAccountPhysical';
import { CreateAccountProfilePicturePage } from '../pages/Create Account - Profile Picture/createAccountProfilePicture';
import { CreateAccountSocialPhysicalPage } from '../pages/Create Account - Social - Physical Data/createAccountSocialPhysical';
import { CreateAccountFinishPage } from '../pages/Create Account - Finish/createAccountFinish';
import { PasswordResetPage } from '../pages/Password Reset/passwordReset';
import { HomePage } from '../pages/home/home';
import { ReportPage } from '../pages/Report Problem/report';
import { RecordActivityPage } from '../pages/Record Activity/recordActivity';
import { ActivityHistoryPage } from '../pages/Activity History/activityHistory';
import { ActivityDetailsPage } from '../pages/Activity Details/activityDetails';
import { AchievementsPage } from '../pages/Achievements/achievements';
import { TrailMapPage } from '../pages/Trail Map/trailMap';
import { AccountStatisticsPage } from '../pages/Account Statistics/accountStatistics';
import { AccountDetailsPage } from '../pages/Account Details/accountDetails';
import { AboutPage } from '../pages/About/about';
import { CreditsPage } from '../pages/Credits/credits';
import { FeedbackPage } from '../pages/Feedback/feedback';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherProvider } from '../providers/weather/weather';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SplashPage,
    LoginPage,
    CreateAccountNamePage,
    CreateAccountEmailPage,
    CreateAccountPasswordPage,
    CreateAccountBirthdatePage,
    CreateAccountSocialBirthdatePage,
    CreateAccountPhysicalPage,
    CreateAccountProfilePicturePage,
    CreateAccountSocialPhysicalPage,
    CreateAccountFinishPage,
    PasswordResetPage,
    HomePage,
    ReportPage,
    RecordActivityPage,
    ActivityHistoryPage,
    ActivityDetailsPage,
    AchievementsPage,
    TrailMapPage,
    AccountStatisticsPage,
    AccountDetailsPage,
    AboutPage,
    CreditsPage,
    FeedbackPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SplashPage,
    LoginPage,
    CreateAccountNamePage,
    CreateAccountEmailPage,
    CreateAccountPasswordPage,
    CreateAccountBirthdatePage,
    CreateAccountSocialBirthdatePage,
    CreateAccountPhysicalPage,
    CreateAccountProfilePicturePage,
    CreateAccountSocialPhysicalPage,
    CreateAccountFinishPage,
    PasswordResetPage,
    HomePage,
    ReportPage,
    RecordActivityPage,
    ActivityHistoryPage,
    ActivityDetailsPage,
    AchievementsPage,
    TrailMapPage,
    AccountStatisticsPage,
    AccountDetailsPage,
    AboutPage,
    CreditsPage,
    FeedbackPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    File,
    Transfer,
    Camera,
    FilePath,
    IonicStorageModule,
    NativeStorage,
    WheelSelector,
    Pedometer,
    DeviceMotion,
    Facebook,
    Base64,
    BackgroundMode,
    InAppBrowser,
    Keyboard,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WeatherProvider,
    OneSignal
  ]
})
export class AppModule {}
