/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  items = [
    { name: 'Notifications', url: 'notificationssettings' },
    { name: 'Email Settings', url: 'emailsettings' },
    { name: 'Account Settings', url: 'accountsettings' },
    { name: 'Manage Addresses', url: 'addressbook' },
    { name: 'Manage Payments', url: 'managepayments' },
    { name: 'Currency Settings', url: 'currencysettings' },
    { name: 'Data Control', url: 'datacontrol' },
    { name: 'Logout', url: 'login' }
  ];

  constructor(private navCtrl: NavController, private fun: FunctionsService, private menuCtrl: MenuController, private page: NavController, private dataService: DataService, private modalController: ModalController) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');
  }

  nav(i){
    if(this.items[i].url == 'login'){
      this.logout();
    }
    else{
      this.navCtrl.navigateForward('/'+this.items[i].url);
    }
  }

  logout(){
    this.page.navigateRoot('/login');
  }

}
