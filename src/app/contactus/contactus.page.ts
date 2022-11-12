import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpcallsService } from '../services/httpcalls.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FunctionsService } from '../functions.service';
import { DynamicDataService } from '../services/dynamic-data.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {
  //@ViewChild('map') mapElement: ElementRef;
 // map: any;
  address;
 // mapLink : SafeResourceUrl;
  mobileno = [];
  constructor(
    private menuCtrl : MenuController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private http: HttpcallsService,
    public domSanitizer: DomSanitizer,
    private fun : FunctionsService,
    private dynamicData : DynamicDataService,
    private storage : Storage,
    private router : Router
  ) { }

  ngOnInit() {

    this.dynamicData.networkConnection.subscribe(status => {
      if(status){
        this.http.postRequest('contact/contact.php',{}).subscribe(res => {
          this.storage.set('contactus', res);
          this.address = res['address']
          let i = 0;
          this.address.forEach(element => {
            console.log(element['mobile'])  
               this.mobileno[i] = element['mobile']
               i++;
          });
          console.log(JSON.stringify(this.mobileno))  
      })
      }
      else if(!status){
        // this.storage.get('contactus').then((res) => {
        //   this.address = res['address']
        //   let i = 0;
        //   this.address.forEach(element => {
        //     console.log(element['mobile'])  
        //        this.mobileno[i] = element['mobile']
        //        i++;
        //   });
        // });
      //  this.router.navigate(['network-state'])
      }
   })

  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
  }

  dismiss(){
    this.fun.back();
  }
  // loadMap() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }
 
  //     this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  //     this.map.addListener('tilesloaded', () => {
  //       console.log('accuracy',this.map);
  //       this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
  //     });
 
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }
 
  // getAddressFromCoords(lattitude, longitude) {
  //   console.log("getAddressFromCoords "+lattitude+" "+longitude);
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  //   };
 
  //   this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
  //     .then((result: NativeGeocoderResult[]) => {
  //       this.address = "";
  //       let responseAddress = [];
  //       for (let [key, value] of Object.entries(result[0])) {
  //         if(value.length>0)
  //            responseAddress.push(value);
 
  //       }
  //       responseAddress.reverse();
  //       for (let value of responseAddress) {
  //         this.address += value+", ";
  //       }
  //       this.address = this.address.slice(0, -2);
  //     })
  //     .catch((error: any) =>{ 
  //       this.address = "Address Not Available!";
  //     });
 
  // }
 
 
}
