import { Component, OnInit } from '@angular/core';
import { Product, DataService } from '../data.service';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { HttpcallsService } from '../services/httpcalls.service';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { Storage } from '@ionic/storage';
import { NullAstVisitor } from '@angular/compiler';
import { DynamicDataService } from '../services/dynamic-data.service';
import { CacheProviderService } from '../cache-provider.service';
import { CacheService } from 'ionic-cache';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.page.html',
  styleUrls: ['./productcategory.page.scss'],
})
export class ProductcategoryPage implements OnInit {

  categoryList;
  product_data_1: Array<Product> = [];

  constructor(
    private dataService: DataService,
    private route : Router,
    private menuCtrl : MenuController,
    private fun: FunctionsService,
    private http: HttpcallsService,
    private popoverController : PopoverController,
    private storage : Storage,
    private dynamicData : DynamicDataService,
    private cacheservice: CacheProviderService,
    private cache : CacheService
  ) { 
    this.product_data_1 = dataService.products_3;
  }

  ngOnInit() {
    this.dynamicData.networkConnection.subscribe(status => {
      if(status){
        this.LoadData();
      }
      else if(!status){
       // this.route.navigate(['network-state'])
      }
   })
      
  }

  LoadData(){
    this.http.postRequest('product/category.php', {}).subscribe(res => {
     if(res['success']){
       //this.storage.set('category', null);
       this.categoryList = res['category_list'];
       //this.storage.set('category', res);
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

  viewProduct(list){
    console.log(list)
    this.route.navigate(['productlist', {category_id : list.category_id, categoryName : list.category_name}])
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
  }

  back(){
    this.route.navigate(['/tabs/dashboard',{}])
  }
}
