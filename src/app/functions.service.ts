/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 *
 */


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { DataService } from './data.service';
import { resolve } from 'q';
import { HttpcallsService } from './services/httpcalls.service';
import { DynamicDataService } from './services/dynamic-data.service';


@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  networkStatus;
  appId = null;
  cartcount;
  constructor(
    public dataService: DataService,
    private router: Router,
    private toastController: ToastController,
    private nav: NavController,
    public alertController: AlertController,
    private dynamicData: DynamicDataService,
    private http : HttpcallsService) {
      
      this.dynamicData.networkConnection.subscribe(status => {
        this.networkStatus = status;
        // alert(status);
     })
     }

  navigate(link, forward?) {
    if (forward) {
      this.nav.navigateForward('/' + link);
    } else {
      this.router.navigateByUrl('/' + link);
    }
  }

  setToken(token){
     this.appId = token;
  }

  getAppId(){
    return this.appId;
  }

  addtowishlist(item) {
    // alert(this.appId);
    this.http.postRequest('wishlist/add.php', { prod_price_id: item['prod_price_id'],app_id: this.appId }).subscribe(response => {
      if (response['success']) {
        console.log("Added to wishlist")
        if(response['checked']){
          item['wishlist'] = 1;
        }else{
          item['wishlist'] = 0;
        }
        console.log(item)
        // this.presentToast(response['message'], false, 'bottom',1500);
      }
    })
  }
  
  set_message_count(count) {
   
    this.cartcount = count;
        console.log('set '+count);
  }
  
  get_message_count() {
   
        console.log('get '+this.cartcount);
    return this.cartcount;
  }

  removeFromWhishList(list) {
    this.http.postRequest('wishlist/remove.php', { prod_price_id: list['prod_price_id'], wishlist: list['wishlist'] }).subscribe(response => {
      if (response['success']) {
        //this.presentToast(response['message'], false, 'bottom', 1500)
        list['wishlist'] = 0;
        console.log(list)
      }
    })
  }

  array(i) {
    const l = [];
    for (let j = 0; j < i; j++) {
      l.push(1);
    }
    return l;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkout() {
    if (this.dataService.current_user.address.length === 0) {
      this.nav.navigateForward('/NewAddress/$1');
    } else {
      this.nav.navigateForward('/Checkout');
    }
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

  back() {
    // this.nav.goBack();
    this.nav.back();
  }

  date(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  update(product) {
    this.dataService.current_product = product;
  }

  removeConform(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are you sure you want to remove this item',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              console.log('Confirm Cancel: blah');
              resolve('cancel');
            }
          }, {
            text: 'Okay',
            handler: (ok) => {
              console.log('Confirm Okay');
              resolve('ok');
            }
          }
        ]
      });

      alert.present();
    });
  }

  calculate(price, discount) {
    price = price - (price * discount / 100);
    return price.toFixed(2);
  }
}
