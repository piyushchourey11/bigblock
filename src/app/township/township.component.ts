import { Component, OnInit, Renderer2, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptService } from "../_services/scriptService";
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-township',
  templateUrl: './township.component.html',
  styleUrls: ['./township.component.css']
})
export class TownshipComponent implements OnInit {

  title: string | undefined;
  latitude: number = 51.678418;
  longitude: number = 7.809007;
  zoom!: number;
  address: string = "";
  private geoCoder!: google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  
  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

ngOnInit() {
  this.title = this.route.snapshot.url[0].path;
  //load Places Autocomplete
  this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  });
}




 // Get Current Location Coordinates
 private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    });
  }
}


markerDragEnd($event: google.maps.MouseEvent): void {
  console.log($event);
  this.latitude = $event.latLng.lat();
  this.longitude = $event.latLng.lng();
  this.getAddress(this.latitude, this.longitude);
}

getAddress(latitude: number, longitude: number) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: string | undefined; }[], status: string) => {
    console.log(results);
    console.log(status);
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        //this.address = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}

}