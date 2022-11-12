/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
 import { Component } from '@angular/core';
 import { Events, Platform, ToastController } from '@ionic/angular';
 import { SplashScreen } from '@ionic-native/splash-screen/ngx';
 import { StatusBar } from '@ionic-native/status-bar/ngx';
 import { DataService } from './data.service';
 import { FunctionsService } from './functions.service';
 //import { FCM } from '@ionic-native/fcm/ngx';
  import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
 import { HttpcallsService } from './services/httpcalls.service';
 import { Router, NavigationStart } from '@angular/router';
 import { Network } from '@ionic-native/network/ngx';
 import { NetworkProvider } from './network-provider.service';
 //import { IonicImageLoaderComponent } from 'ionic-image-loader';
 import { ImageLoaderConfigService } from 'ionic-image-loader';
 import { CacheService } from 'ionic-cache';
 import { DynamicDataService } from './services/dynamic-data.service';
 
 
 @Component({
   selector: 'app-root',
   templateUrl: 'app.component.html'
 })
 export class AppComponent {
 
   side_open = true;
   side_open1 = true;
   counter;
   urlStr = [];
 
   menu(b) {
     if (b) {
       this.side_open = false;
       this.side_open1 = true;
     }
     else {
       this.side_open = false;
       this.side_open1 = false;
     }
   }
 
   back() {
     this.side_open = true;
   }
   constructor(
     private platform: Platform,
     private splashScreen: SplashScreen,
     private statusBar: StatusBar,
     public dataService: DataService,
     public fun: FunctionsService,
     private fcm: FCM,
     private router: Router,
     private http: HttpcallsService,
     private network: Network,
     public networkProvider: NetworkProvider,
     public events: Events,
     private dynamicData: DynamicDataService,
     //private imgLoader : IonicImageLoaderComponent,
     private cache: CacheService,
     public toastController: ToastController,
   ) {
     this.counter = 0;
 
     platform.ready().then(() => {
       this.initFirebase();
     })
     // this.toast("App initializeApp 1");
     this.initializeApp();
     // this.router.events.subscribe(event => {
     //   if(event instanceof NavigationStart) {
     //     this.dynamicData.networkConnection.subscribe(status => {
     //       if(!status){
     //         this.router.navigate(['network-state'])
     //       }
     //    })
     //    // alert(event)
     //   }
     // })
 
   }
 
   initializeApp() {
     // this.toast("App Component 0 ");
     this.platform.ready().then(() => {
       // alert("App Component");
       // this.toast("App Component");
       // this.cache.setDefaultTTL(60 * 60 * 12);
       // this.cache.setOfflineInvalidate(false);
       this.statusBar.backgroundColorByHexString('#b0ca1f');
       //this.imgLoader.enableFallbackAsPlaceholder(true); 
       // alert('initializeApp')
       this.checkNetwork();
     });
 
     this.platform.backButton.subscribeWithPriority(9999, () => {
       this.urlStr = this.router.url.split(";")
       // let res = this.urlStr[0].split("/", 3);
       // alert(this.urlStr[0].split("/", 3))
       // alert(res[2])
       //this.fun.presentToast(this.urlStr[0], false,'middle', 1500)
       if (this.urlStr[0] === '/tabs/productcategory' || this.urlStr[0] === '/network-state' || this.urlStr[0] === '/tabs/wishlist' || this.urlStr[0] === '/tabs/search' || this.urlStr[0] === '/tabs/download') {
         // alert("this is wortking1");
         this.router.navigateByUrl('tabs/dashboard')
       } else {
         this.fun.back();
       }
     });
 
     this.platform.backButton.subscribe((value) => {
 
       if (this.counter === 0) {
         this.counter++;
         if (this.router.url === '/tabs/dashboard' && this.counter !== 0) {
           navigator['app'].exitApp();
         }
         if (this.router.url === '/tabs/download' && this.counter !== 0) {
           //  alert("this is wortking2");
            this.router.navigateByUrl('tabs/dashboard');
         }
         setTimeout(() => {
           this.counter = 0;
         }, 500);
       } else {
         if (this.counter !== 0) {
           navigator['app'].exitApp();
         }
       }
 
     });
 
   }
 
   // this.toast("App Component");
   // async toast(msg: string, duration?: number) {
   //   const toast = await this.toastController.create({
   //     message: msg,
   //     duration: 2000,
   //     color: 'primary'
   //   });
   //   toast.present();
   // }
 
   checkNetwork() {
     // alert("check net call");
     this.networkProvider.initializeNetworkEvents();
     // Offline event
     this.events.subscribe('network:offline', () => {
       alert("offline");
     });
     // Online event
     this.events.subscribe('network:online', () => {
       alert("online");
     });
   }
 
   initFirebase() {
     //alert('Yes Call');
     // subscribe to a topic
     this.fcm.subscribeToTopic('All');
 
     this.fcm.getToken().then(token => {
        console.log("Token- " + JSON.stringify(token));
       this.http.registerAppId(token);
       this.fun.setToken(token);
       this.fcm.subscribeToTopic('All');
     }).catch(err => {
       // alert(err)
       console.log("this is error = ", err)
 
     });
     this.fcm.subscribeToTopic('All');
 
     this.fcm.onTokenRefresh().subscribe(token => {
       // alert(token);
       this.http.registerAppId(token);
       this.fcm.subscribeToTopic('All');
     });
 
     this.fcm.getInitialPushPayload().then((payload) => {
   
       if(payload.wasTapped) {
         console.log("Received FCM when app is closed -> ", JSON.stringify(payload));
         // call your function to handle the data
         this.router.navigateByUrl('tabs/download')
       }                                 
       
     });
 
     this.fcm.onNotification().subscribe(data => {
       console.log("payload...sdsd" + JSON.stringify(data));
       if (data.wasTapped) {
         //alert('Received in background');
         // console.log("payload...ww" + data);
         this.router.navigateByUrl('tabs/download')
       } else {
         alert('Received in foreground');
       }
       console.log(JSON.stringify("Notification data ..." + data));
     });
     // unsubscribe from a topic
     // this.fcm.unsubscribeFromTopic('offers');
   }
 }
 