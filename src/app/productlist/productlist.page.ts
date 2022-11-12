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
import { File } from '@ionic-native/File/ngx';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
  inputs: ['recieved_data']
})
export class ProductlistPage implements OnInit {

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
  productList;
  catTitle = "All";
  count=0;
  allProducts
  // product_prise;

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
     ) {
  }


  ngOnChanges(changes: SimpleChanges) {    
    this.ngOnInit();
  }

  ngOnInit() {
    this.dynamicData.networkConnection.subscribe(status => {
      if(status){
        this.category_id = this.avtivatedRoute.snapshot.paramMap.get('category_id')
    //this.storage.set("CATEGORY_"+this.category_id, null ); 
    this.catTitle = this.avtivatedRoute.snapshot.paramMap.get('categoryName')
    if(this.catTitle == null){
      this.catTitle = 'All';
    }
    this.loadProductData();
      }
      else if(!status){
       // this.router.navigate(['network-state'])
      }
   })
   
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

  loadDataOnScroll(infiniteScroll){
    this.page++;
    this.loadProductData(infiniteScroll);
    if (this.page === 1000) {
      infiniteScroll.enable(false);
    }
  }

  loadProductData(infiniteScroll?, event?, reset?) {
    if(this.category_id == null){
      this.category_id = '0';
    }
    let params = {category_id: this.category_id, start: this.page }  
    if (event | reset) {
      this.page = 1;
      this.productList = []
    }    
    this.http.postRequest('product/list.php', params, infiniteScroll ? false : true).subscribe(productsres => {
      if(this.page == 1){
        this.productList = []
      }
      productsres['product_list'].forEach(element => {
        element.loaded = false;
      });
      this.productList = this.productList.concat(productsres['product_list']);   
      // this.product_prise = this.productList['product_prise'];
      // console.log(this.productList);
     // this.storage.set("CATEGORY_"+this.category_id, this.productList );   
      if (event) {
        event.target.complete();
      }
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
    })
  }


  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    //this.ngOnInit();
  }

  open(list) {
     console.log(list);
    this.router.navigate(['productdetail', { product_id: list['product_id'] , finish: list['finish'] , size : list['size'], list : JSON.stringify(list)}]);
  }

  addProductToWishlist(item) {
     this.fun.addtowishlist(item);
  }

  removeProductFromWhishList(list) {
    this.fun.removeFromWhishList(list)
  }

  like() {
    console.log('like')
    this.liked = !this.liked;
  }
}
