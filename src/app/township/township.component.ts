import { Component, OnInit, Renderer2, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ScriptService } from "../_services/scriptService";
import { MapsAPILoader } from '@agm/core';

import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,  Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';



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
  townshipForm:any;
  submited = false;
  id:any
  townshipData:any;
  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router, 
    private api : ApiService, private fb: FormBuilder
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if(this.id) {
      this.getTownshipList(this.id);
    }else{
      this.setFroms()
    }


  }

  getTownshipList(id:any) {
    this.api.fetchData('townshiplist/'+id, {}, "Get").subscribe((res:any) => {
      if(res['status'] == 1) {
        this.townshipData = res['data'];
        this.setFroms()

      }else {
        this.setFroms()
      }
    })
  }

ngOnInit() {
  this.title = this.route.snapshot.url[0].path;
  //load Places Autocomplete
  this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;
    let ele = this.searchElementRef?this.searchElementRef.nativeElement: undefined;
    if(ele) {

      let autocomplete = new google.maps.places.Autocomplete(ele);
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
    }
  });

 
}

setFroms(){
  let data = this.townshipData ? this.townshipData : {}
  this.townshipForm = this.fb.group({
    township_name: [data.township_name?data.township_name:"",Validators.required],
    state: [data.state?data.state:"",[Validators.required]],
    city: [data.city?data.city:"",[Validators.required]],
    pincode:[data.pincode?data.pincode:"",[Validators.required,Validators.pattern("^[0-9]*$"),
    Validators.minLength(5), Validators.maxLength(5)]],
    number_of_plots:[data.number_of_plots?data.number_of_plots:"",[Validators.required],Validators.minLength(1)],
    total_size_of_township:[data.total_size_of_township?data.total_size_of_township:"",[Validators.required,Validators.pattern("^[0-9]*$")]],
    owner:[data.colonizer_status?data.colonizer_status:"",[Validators.required]],
    colonizer_status:[data.colonizer_status?data.colonizer_status:"",[Validators.required]],
    documents:[data.documents?data.documents:"",[Validators.required]],
    document_data:[data.document_data?data.document_data:"",[Validators.required]],
    longitude:[data.longitude?data.longitude:"",[Validators.required]],
    latitude:[data.latitude?data.latitude:"",[Validators.required]],
    description:[data.description?data.description:"",[Validators.required]],
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


get f() { return this.townshipForm.controls}

 register(){
   console.log(this.townshipForm.value);
  this.submited = true;
  if (this.townshipForm.invalid) {
    //  this.submited = false;
     return;
  }
  this.api.loader('start')

  let obj = this.townshipForm.value;

  this.api.postData('register/',obj,'post').subscribe(res => {
    console.log(res);
    if(res['status'] == 1) {
      this.api.loader('stop')

      this.submited = false;
      this.api.showNotification('success', res['message']);
    }else{      
      this.api.showNotification('error', res['message']);
      this.api.loader('stop')

      // this.updateFormdata({})
      
    }
    })

 }
 update(){
   console.log(this.townshipForm.value);
  this.submited = true;
  if (this.townshipForm.invalid) {
    //  this.submited = false;
     return;
  }
  this.api.loader('start')

  let obj = this.townshipForm.value;

  this.api.postData('updateTownship/',obj,'post').subscribe(res => {
    console.log(res);
    if(res['status'] == 1) {
      this.api.loader('stop')

      this.submited = false;
      this.api.showNotification('success', res['message']);
    }else{      
      this.api.showNotification('error', res['message']);
      this.api.loader('stop')

      // this.updateFormdata({})
      
    }
    })

 }

 onfileUpload(event:any){
 // console.log(event.target.files[0]);
 let regex  =new RegExp('^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$')
 const reader = new FileReader();
 reader.readAsDataURL(event.target.files[0]);
 let type:any = event.target.files[0].type;
     // console.log(event.target.files[0])
 let filename:any = event.target.files[0].name;

     reader.onload = (event:any) => {
 
     let data =  event.target['result'];
     console.log('type',type)
     console.log('bs64',data)
     this.townshipForm.patchValue({
      document_data :data,
      type:type
     })
     }
 }

 ondecriptionchange(event:any){
   console.log(event)
  this.townshipForm.patchValue({
    description:event.target.value
  })
 }


}