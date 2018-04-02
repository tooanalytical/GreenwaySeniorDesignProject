import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { Http } from '@angular/http';

@Component({
  selector: 'page-accountDetails',
  templateUrl: 'accountDetails.html'
})
export class AccountDetailsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private alertCtrl: AlertController,
    private http: Http,
    private selector: WheelSelector
  ) {
    this.getUserInfo();
  }

  userName;
  firstName;
  lastName;
  emailAddress;
  userHeight;
  userWeight;
  userBirthdate;
  userGender;
  userAvatar;
  response;
  public editState: boolean = false;
  public submitState: boolean = true;

  data = {
    userId: this.storage.get('userId').then(val => {
      this.data.userId = val;
    }),
    firstName: this.firstName,
    lastName: this.lastName,
    userHeight: this.userHeight,
    userWeight: this.userWeight,
    userGender: this.userGender,
    userAvatar: this.userAvatar
  };

  physicalData = {
    heights: [
      { description: '' },
      { description: '< 4 Feet 0 Inches' },
      { description: '4 Feet 0 Inches' },
      { description: '4 Feet 1 Inches' },
      { description: '4 Feet 2 Inches' },
      { description: '4 Feet 3 Inches' },
      { description: '4 Feet 4 Inches' },
      { description: '4 Feet 5 Inches' },
      { description: '4 Feet 6 Inches' },
      { description: '4 Feet 7 Inches' },
      { description: '4 Feet 8 Inches' },
      { description: '4 Feet 9 Inches' },
      { description: '4 Feet 10 Inches' },
      { description: '4 Feet 11 Inches' },
      { description: '5 Feet 0 Inches' },
      { description: '5 Feet 1 Inches' },
      { description: '5 Feet 2 Inches' },
      { description: '5 Feet 3 Inches' },
      { description: '5 Feet 4 Inches' },
      { description: '5 Feet 5 Inches' },
      { description: '5 Feet 6 Inches' },
      { description: '5 Feet 7 Inches' },
      { description: '5 Feet 8 Inches' },
      { description: '5 Feet 9 Inches' },
      { description: '5 Feet 10 Inches' },
      { description: '5 Feet 11 Inches' },
      { description: '6 Feet 0 Inches' },
      { description: '6 Feet 1 Inches' },
      { description: '6 Feet 2 Inches' },
      { description: '6 Feet 3 Inches' },
      { description: '6 Feet 4 Inches' },
      { description: '6 Feet 5 Inches' },
      { description: '6 Feet 6 Inches' },
      { description: '6 Feet 7 Inches' },
      { description: '6 Feet 8 Inches' },
      { description: '6 Feet 9 Inches' },
      { description: '6 Feet 10 Inches' },
      { description: '6 Feet 11 Inches' },
      { description: '7 Feet 0 Inches' },
      { description: '7 Feet 1 Inches' },
      { description: '7 Feet 2 Inches' },
      { description: '7 Feet 3 Inches' },
      { description: '7 Feet 4 Inches' },
      { description: '7 Feet 5 Inches' },
      { description: '7 Feet 6 Inches' },
      { description: '7 Feet 7 Inches' },
      { description: '7 Feet 8 Inches' },
      { description: '7 Feet 9 Inches' },
      { description: '7 Feet 10 Inches' },
      { description: '7 Feet 11 Inches' },
      { description: '8 Feet 0 Inches' },
      { description: '> 8 Feet 0 Inches' }
    ],
    weights: [
      { description: '' },
      { description: '< 80 lbs' },
      { description: '80 lbs' },
      { description: '81 lbs' },
      { description: '82 lbs' },
      { description: '83 lbs' },
      { description: '84 lbs' },
      { description: '85 lbs' },
      { description: '86 lbs' },
      { description: '87 lbs' },
      { description: '88 lbs' },
      { description: '89 lbs' },
      { description: '90 lbs' },
      { description: '91 lbs' },
      { description: '92 lbs' },
      { description: '93 lbs' },
      { description: '94 lbs' },
      { description: '95 lbs' },
      { description: '96 lbs' },
      { description: '97 lbs' },
      { description: '98 lbs' },
      { description: '99 lbs' },
      { description: '100 lbs' },
      { description: '101 lbs' },
      { description: '102 lbs' },
      { description: '103 lbs' },
      { description: '104 lbs' },
      { description: '105 lbs' },
      { description: '106 lbs' },
      { description: '107 lbs' },
      { description: '108 lbs' },
      { description: '109 lbs' },
      { description: '110 lbs' },
      { description: '111 lbs' },
      { description: '112 lbs' },
      { description: '113 lbs' },
      { description: '114 lbs' },
      { description: '115 lbs' },
      { description: '116 lbs' },
      { description: '117 lbs' },
      { description: '118 lbs' },
      { description: '119 lbs' },
      { description: '120 lbs' },
      { description: '121 lbs' },
      { description: '122 lbs' },
      { description: '123 lbs' },
      { description: '124 lbs' },
      { description: '125 lbs' },
      { description: '126 lbs' },
      { description: '127 lbs' },
      { description: '128 lbs' },
      { description: '129 lbs' },
      { description: '130 lbs' },
      { description: '131 lbs' },
      { description: '132 lbs' },
      { description: '133 lbs' },
      { description: '134 lbs' },
      { description: '135 lbs' },
      { description: '136 lbs' },
      { description: '137 lbs' },
      { description: '138 lbs' },
      { description: '139 lbs' },
      { description: '140 lbs' },
      { description: '141 lbs' },
      { description: '142 lbs' },
      { description: '143 lbs' },
      { description: '144 lbs' },
      { description: '145 lbs' },
      { description: '146 lbs' },
      { description: '147 lbs' },
      { description: '148 lbs' },
      { description: '149 lbs' },
      { description: '150 lbs' },
      { description: '151 lbs' },
      { description: '152 lbs' },
      { description: '153 lbs' },
      { description: '154 lbs' },
      { description: '155 lbs' },
      { description: '156 lbs' },
      { description: '157 lbs' },
      { description: '158 lbs' },
      { description: '159 lbs' },
      { description: '160 lbs' },
      { description: '161 lbs' },
      { description: '162 lbs' },
      { description: '163 lbs' },
      { description: '164 lbs' },
      { description: '165 lbs' },
      { description: '166 lbs' },
      { description: '167 lbs' },
      { description: '168 lbs' },
      { description: '169 lbs' },
      { description: '170 lbs' },
      { description: '171 lbs' },
      { description: '172 lbs' },
      { description: '173 lbs' },
      { description: '174 lbs' },
      { description: '175 lbs' },
      { description: '176 lbs' },
      { description: '177 lbs' },
      { description: '178 lbs' },
      { description: '179 lbs' },
      { description: '180 lbs' },
      { description: '181 lbs' },
      { description: '182 lbs' },
      { description: '183 lbs' },
      { description: '184 lbs' },
      { description: '185 lbs' },
      { description: '186 lbs' },
      { description: '187 lbs' },
      { description: '188 lbs' },
      { description: '189 lbs' },
      { description: '190 lbs' },
      { description: '191 lbs' },
      { description: '192 lbs' },
      { description: '193 lbs' },
      { description: '194 lbs' },
      { description: '195 lbs' },
      { description: '196 lbs' },
      { description: '197 lbs' },
      { description: '198 lbs' },
      { description: '199 lbs' },
      { description: '200 lbs' },
      { description: '201 lbs' },
      { description: '202 lbs' },
      { description: '203 lbs' },
      { description: '204 lbs' },
      { description: '205 lbs' },
      { description: '206 lbs' },
      { description: '207 lbs' },
      { description: '208 lbs' },
      { description: '209 lbs' },
      { description: '210 lbs' },
      { description: '211 lbs' },
      { description: '212 lbs' },
      { description: '213 lbs' },
      { description: '214 lbs' },
      { description: '215 lbs' },
      { description: '216 lbs' },
      { description: '217 lbs' },
      { description: '218 lbs' },
      { description: '219 lbs' },
      { description: '220 lbs' },
      { description: '221 lbs' },
      { description: '222 lbs' },
      { description: '223 lbs' },
      { description: '224 lbs' },
      { description: '225 lbs' },
      { description: '226 lbs' },
      { description: '227 lbs' },
      { description: '228 lbs' },
      { description: '229 lbs' },
      { description: '230 lbs' },
      { description: '231 lbs' },
      { description: '232 lbs' },
      { description: '233 lbs' },
      { description: '234 lbs' },
      { description: '235 lbs' },
      { description: '236 lbs' },
      { description: '237 lbs' },
      { description: '238 lbs' },
      { description: '239 lbs' },
      { description: '240 lbs' },
      { description: '241 lbs' },
      { description: '242 lbs' },
      { description: '243 lbs' },
      { description: '244 lbs' },
      { description: '245 lbs' },
      { description: '246 lbs' },
      { description: '247 lbs' },
      { description: '248 lbs' },
      { description: '249 lbs' },
      { description: '250 lbs' },
      { description: '251 lbs' },
      { description: '252 lbs' },
      { description: '253 lbs' },
      { description: '254 lbs' },
      { description: '255 lbs' },
      { description: '256 lbs' },
      { description: '257 lbs' },
      { description: '258 lbs' },
      { description: '259 lbs' },
      { description: '260 lbs' },
      { description: '261 lbs' },
      { description: '262 lbs' },
      { description: '263 lbs' },
      { description: '264 lbs' },
      { description: '265 lbs' },
      { description: '266 lbs' },
      { description: '267 lbs' },
      { description: '268 lbs' },
      { description: '269 lbs' },
      { description: '270 lbs' },
      { description: '271 lbs' },
      { description: '272 lbs' },
      { description: '273 lbs' },
      { description: '274 lbs' },
      { description: '275 lbs' },
      { description: '276 lbs' },
      { description: '277 lbs' },
      { description: '278 lbs' },
      { description: '279 lbs' },
      { description: '280 lbs' },
      { description: '281 lbs' },
      { description: '282 lbs' },
      { description: '283 lbs' },
      { description: '284 lbs' },
      { description: '285 lbs' },
      { description: '286 lbs' },
      { description: '287 lbs' },
      { description: '288 lbs' },
      { description: '289 lbs' },
      { description: '290 lbs' },
      { description: '291 lbs' },
      { description: '292 lbs' },
      { description: '293 lbs' },
      { description: '294 lbs' },
      { description: '295 lbs' },
      { description: '296 lbs' },
      { description: '297 lbs' },
      { description: '298 lbs' },
      { description: '299 lbs' },
      { description: '300 lbs' },
      { description: '> 300 lbs' }
    ],
    gender: [
      { description: '' },
      { description: 'Male' },
      { description: 'Female' },
      { description: 'Non-Binary' }
    ]
  };

  openMenu() {
    this.editState = !this.editState;
    this.submitState = !this.submitState;
  }

  setName() {
    let alert = this.alertCtrl.create({
      title: 'Edit Name',
      inputs: [
        {
          name: 'first',
          placeholder: 'First Name'
        },
        {
          name: 'last',
          placeholder: 'Last Name'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            if (this.nameValidation()) {
              this.storage.set('firstName', data.first);
              this.storage.set('lastName', data.last);
              this.storage.set('fullName', data.first + ' ' + data.last);
              var fullName = data.first + ' ' + data.last;
              var link =
                'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/edit_user.php';
              var myData = JSON.stringify({
                userId: this.data.userId,
                changeField: 'fullName',
                changeValue: fullName
              });
              this.http.post(link, myData).subscribe(
                data => {
                  this.response = data['_body'];
                },
                error => {
                  console.log('Oooops!');
                }
              );
              this.navCtrl.setRoot(AccountDetailsPage);
            } else {
              this.presentNameAlert();
            }
          }
        }
      ]
    });
    alert.present();
  }

  setHeight() {
    this.selector
      .show({
        title: 'Edit Height',
        items: [this.physicalData.heights]
      })
      .then(
        result => {
          this.userHeight = result[0].description;

          this.storage.set('userHeight', result[0].description);
          var link =
            'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/edit_user.php';
          var myData = JSON.stringify({
            userId: this.data.userId,
            changeField: 'intHeight',
            changeValue: result[0].description
          });
          this.http.post(link, myData).subscribe(
            data => {
              this.response = data['_body'];
            },
            error => {
              console.log('Oooops!');
            }
          );
          this.navCtrl.setRoot(AccountDetailsPage);
        },
        err => console.log('Error: ', err)
      );
  }

  setWeight() {
    this.selector
      .show({
        title: 'Edit Weight',
        items: [this.physicalData.weights]
      })
      .then(
        result => {
          this.userWeight = result[0].description;
          this.storage.set('userWeight', result[0].description);

          var link =
            'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/edit_user.php';
          var myData = JSON.stringify({
            userId: this.data.userId,
            changeField: 'intWeight',
            changeValue: result[0].description
          });
          this.http.post(link, myData).subscribe(
            data => {
              this.response = data['_body'];
            },
            error => {
              console.log('Oooops!');
            }
          );

          this.navCtrl.setRoot(AccountDetailsPage);
        },
        err => console.log('Error: ', err)
      );
  }

  setGender() {
    this.selector
      .show({
        title: 'Edit Gender',
        items: [this.physicalData.gender]
      })
      .then(
        result => {
          this.userGender = result[0].description;
          this.storage.set('userGender', result[0].description);

          var link =
            'https://virdian-admin-portal-whitbm06.c9users.io/Mobile_Connections/edit_user.php';
          var myData = JSON.stringify({
            userId: this.data.userId,
            changeField: 'strGender',
            changeValue: result[0].description
          });
          this.http.post(link, myData).subscribe(
            data => {
              this.response = data['_body'];
            },
            error => {
              console.log('Oooops!');
            }
          );
          this.navCtrl.setRoot(AccountDetailsPage);
        },
        err => console.log('Error: ', err)
      );
  }

  nameValidation() {
    var flag;

    if (
      this.firstName !== '' &&
      this.lastName !== '' &&
      /^[a-zA-Z]+$/.test(this.data.firstName) &&
      /^[a-zA-Z]+$/.test(this.data.lastName)
    ) {
      flag = true;
    } else {
      flag = false;
    }
    return flag;
  }

  presentNameAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uh oh!',
      subTitle:
        'Please make sure your name is not blank and only contains letters.',
      buttons: ['Ok']
    });
    alert.present();
  }

  getUserInfo() {
    this.storage.get('fullName').then(val => {
      this.userName = val;
    });
    this.storage.get('email').then(val => {
      this.emailAddress = val;
    });
    this.storage.get('userHeight').then(val => {
      this.userHeight = val;
    });
    this.storage.get('userWeight').then(val => {
      this.userWeight = val;
    });
    this.storage.get('userBirthdate').then(val => {
      this.userBirthdate = val;
    });
    this.storage.get('userGender').then(val => {
      this.userGender = val;
    });
    this.storage.get('userAvatar').then(val => {
      this.userAvatar = val;
      console.log('User Avatar value: ' + this.userAvatar);
    });
  }
}
