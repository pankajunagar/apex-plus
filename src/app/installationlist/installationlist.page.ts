/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Product, DataService } from '../data.service';
import { FunctionsService } from '../functions.service';
import { NavController, IonInfiniteScroll, MenuController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpcallsService } from '../services/httpcalls.service';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { DynamicDataService } from '../services/dynamic-data.service';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { File } from '@ionic-native/File/ngx';

@Component({
  selector: 'app-installation',
  templateUrl: './installationlist.page.html',
  styleUrls: ['./installationlist.page.scss'],
  inputs: ['recieved_data']
})
export class InstallationPage implements OnInit {

  @Input() recieved_data: Array<Product>;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  liked = false;
  local_user_data;
  wishlist_id = null;
  category_id = '0';
  products = [];
  page = 1;
  tab_name;
  filter_params = {}
  installationList;
  catTitle = "Installation Videos";
  count=0;
  allProducts


  constructor(private fun: FunctionsService,
     private nav: NavController,  
     private router: Router,
     private dataService: DataService,
     private menuCtrl: MenuController,
     private http: HttpcallsService, 
     private avtivatedRoute : ActivatedRoute,
     private popoverController : PopoverController,
     private dynamicData : DynamicDataService,
     private storage : Storage,
     private file : File,
     public sanitizer: DomSanitizer
     ) {
  }


  ngOnChanges(changes: SimpleChanges) {    
    this.ngOnInit();
  }

  ngOnInit() {
    this.dynamicData.networkConnection.subscribe(status => {
      if(status){
        this.LoadData();
      }
      else if(!status){
       // this.route.navigate(['network-state'])
      }
   });
   
  }

  
  ngAfterContentInit(): void {
    this.ngOnInit();

  }

  getvalue(value){
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  async moreoption(event) {
    const popover = await this.popoverController.create({
      component: PopupMenuComponent,
      event : event,
      cssClass : 'custom-content',
      translucent: false
    });
    return await popover.present();
  }

  LoadData(){
    this.http.postRequest('installation/list.php', {}).subscribe(res => {
     if(res['success']){
       //this.storage.set('category', null);
       this.installationList = res['installation_data'];
       //this.storage.set('category', res);
     }
    })
 }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    //this.ngOnInit();
  }

  dismiss() {
    this.fun.back();
  }
}
