import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

declare var google;
declare var map;

@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html'
})

export class TicketsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  data: Array<any>;
  activityData = {};
    // Icon on map displaying users current location
    public icon = {
      url:
        'http://52.227.182.243/Mobile_Connections/userpositionIcon.png',
      size: new google.maps.Size(22, 22),
      point: new google.maps.Point(0, 18),
      points: new google.maps.Point(11, 11)
    };

    public ticketIcon = {
      url:
        'http://52.227.182.243/images/markerLogo.png',

    };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,  
    private alertCtrl: AlertController,  
    public http: Http,
    public storage: Storage
  ) {}

  note;
  response: '';
  userId = this.storage.get('userId').then(val => {
    this.userId = val;
  });

  //activityList = {};
  ionViewWillEnter() {
    this.getTickets();
   this.watchMap();
  }

    // Gets a list of activities performed by the user by sending the userId and receiving Date and activity type.
    getTickets() {
      console.log('getTicket() called');
      console.log('User Id: ' + this.userId);
      var link =
        'http://52.227.182.243/Mobile_Connections/get_tickets.php';
      var myData = JSON.stringify({
        userId: this.userId
      });
      console.log('Calling post...');
      this.http.post(link, myData).subscribe(data => {
        var response = data['_body'];
        console.log('Response: ' + response);
        console.log("updated build");
        this.data = JSON.parse(response);
        var lat, lng, ticketId;
        console.log('Now in Data Array: ' + this.data);
        for (let activity in this.data) {
          if(this.data[activity].urgent = '1'){
            this.data[activity].urgent = 'Yes';
          } else if(this.data[activity].urgent = '0'){
            this.data[activity].urgent = 'No';
          }
          lat = this.data[activity].gpsLat;
          lng = this.data[activity].gpsLong;
          ticketId = this.data[activity].ticketId;
          this.addMarker(ticketId, lat,lng);
        }

        //this.addMarker(ticketId, lat,lng);
      });
    }
    
  addNote(ticketId){
    let alert = this.alertCtrl.create({
      title: "New Ticket Note",
      message: "Add a ticket note here",
      inputs:[
        {
          name: 'note',
          placeholder: 'Note'
        },
      ],
      buttons:[
        {
          text: 'Submit',
          handler: data => {
            var link =
              'http://52.227.182.243/Mobile_Connections/add_note.php';
            var myData = JSON.stringify({
             userId: this.userId,
              ticketId: ticketId,
              note: data.note
            });
            this.http.post(link, myData).subscribe(
              data => {
                this.response = data['_body'];
              },
              error => {
                console.log('Oooops!');
              }
            );
            //this.navCtrl.setRoot(TicketsPage);
          }
        },
        {
          text: 'Cancel',
          handler: data =>{
           // this.navCtrl.setRoot(TicketsPage);
          }
        }
      ]
    });
    alert.present();
  }

  closeTicket(ticketId){
    let alert = this.alertCtrl.create({
      title: "Close Ticket",
      message: "Would you like to close Ticket " + ticketId + "?",
      buttons:[
        {
          text: 'Yes',
          handler: data => {
            var link =
              'http://52.227.182.243/Mobile_Connections/close_ticket.php';
            var myData = JSON.stringify({
             userId: this.userId,
              ticketId: ticketId
            });
            this.http.post(link, myData).subscribe(
              data => {
                this.response = data['_body'];
              },
              error => {
                console.log('Oooops!');
              }
            );
            this.navCtrl.setRoot(TicketsPage);
          }
        },
        {
          text: 'Cancel',
          handler: data =>{
           // this.navCtrl.setRoot(TicketsPage);
          }
        }
      ]
    });
    alert.present();
  }

  watchMap() {
    this.geolocation.getCurrentPosition().then(
      position => {
        let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        let ticketLatLng = new google.maps.LatLng(
          
        )

        let mapOptions = {
          center: latLng,
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
        
        let marker = new google.maps.Marker({
          map: this.map,
          icon: this.icon,
          position: latLng
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  addMarker(ticketInfo, lat,lng){
    console.log("In addMarker");
    let latLng = new google.maps.LatLng(
      lat,
      lng
    );
    console.log("latlng: " + latLng);
    let marker = new google.maps.Marker({
      map: this.map,
      icon: this.ticketIcon,
      title: 'Ticket Id #' + ticketInfo,
      position: latLng
    });
  }
}