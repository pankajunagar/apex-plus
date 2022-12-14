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
  isScrollDisabled = false; //used to enable and disable scroll while using the scroll bar
  letterGroups: Array<string> = []; //each letter that will show up in a divider. Used for validLetters
  categoryGroups: Array<any> = []; //{ names: Array<string>, letterGroup: string }

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
      if(this.categoryList.length){
        this.createCategoryGroup()
      }
     }
    })
 }

  //called upon each emitted letter change
  goToLetterGroup(letter: string) {
    this.isScrollDisabled = true;
    let elementId = `alphabet-scroll-${letter}`;
    let element = document.getElementById(elementId);
    element.scrollIntoView();
    // hapticsImpactLight();
  }

  //Disables the scroll while user is using the scroll bar
  enableScroll() {
    this.isScrollDisabled = false;
  }


  createCategoryGroup() {
  this.letterGroups = [];
  let currentLetter = undefined;
  let activeGroup = [];

  this.categoryList.forEach((data) => {
    let firstLetter = data.category_name.charAt(0);
    if (firstLetter != currentLetter) {
      currentLetter = firstLetter;
      this.letterGroups.push(currentLetter);

      let newGroup = {
        letterGroup: currentLetter,
        categories: [],
      };

      activeGroup = newGroup.categories;
      this.categoryGroups.push(newGroup);
    }
    activeGroup.push(data);
  });
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
    this.route.navigate(['productlist', {category_id : list.category_id, categoryName : list.category_name}])
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
  }

  back(){
    this.route.navigate(['/tabs/dashboard',{}])
  }
}
