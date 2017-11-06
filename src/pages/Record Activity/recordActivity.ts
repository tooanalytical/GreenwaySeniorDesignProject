import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";

declare var google;

@Component({
  selector: "page-recordActivity",
  templateUrl: "recordActivity.html"
})
export class RecordActivityPage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;

  public timer = "00:00:00";
  public startButton = "START";
  public seconds;
  public minutes;
  public hours;
  public start;
  public default;
  public timer_id;

  public buttonColor: string = "#558bed"; //Default blue

  public addZero = function(value) {
    if (value < 10) {
      value = "0" + value;
    }
    return value;
  };

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {}

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then(
      position => {
        let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  startStop() {
    if (this.startButton === "Start") {
      this.start = new Date();
      this.timer_id = setInterval(() => {
        this.seconds = Math.floor(
          (new Date().getTime() - this.start.getTime()) / 1000
        );
        this.minutes = Math.floor(this.seconds / 60);
        this.hours = Math.floor(this.minutes / 60);

        this.seconds = this.seconds - this.minutes * 60;
        this.minutes = this.minutes - this.hours * 60;

        this.hours = this.addZero(this.hours);
        this.minutes = this.addZero(this.minutes);
        this.seconds = this.addZero(this.seconds);

        this.timer = this.hours + ":" + this.minutes + ":" + this.seconds;
      }, 10);

      this.startButton = "End";
      this.buttonColor = "#ff0000"; //color red
      this.default = "danger";
    } else {
      clearInterval(this.timer_id);

      this.startButton = "Start";
      this.buttonColor = "#558bed"; //default blue
      this.default = "default";
    }
  }
}
