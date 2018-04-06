import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CreditsPage } from '../Credits/credits';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string; note: string; icon: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = [
      'flask',
      'wifi',
      'beer',
      'football',
      'basketball',
      'paper-plane',
      'american-football',
      'boat',
      'bluetooth',
      'build'
    ];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AboutPage, {
      item: item
    });
  }

  gnuWebpage() {
    const browser = this.iab.create(
      'https://www.gnu.org/licenses/',
      '_system',
      {
        location: 'no'
      }
    );
  }

  creditsPage() {
    this.navCtrl.push(CreditsPage);
  }
}
