import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firstName;
  weather:any;
  location:{
    city:string,
    state:string
  }
  constructor(public navCtrl: NavController,
     public storage: Storage,
     private weatherProvider: WeatherProvider) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.storage.get('firstName').then(val => {
      this.firstName = val;
    });
  }
  ionViewWillEnter(){

    this.storage.get('location').then((val) => {
      this.location = {
        city: 'Fort Wayne',
        state: 'IN'
      }

      this.weatherProvider.getWeather(this.location.city, this.location.state)  .subscribe(weather => {
          this.weather = weather.current_observation;
        });
    });
  }

}
