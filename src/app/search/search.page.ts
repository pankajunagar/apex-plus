/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { DataService } from '../data.service';
import { HomePage } from '../home/home.page';
import { NavController, MenuController, IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpcallsService } from '../services/httpcalls.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { DynamicDataService } from '../services/dynamic-data.service';
import { Storage } from '@ionic/storage';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})


export class SearchPage implements OnInit {
  @ViewChild('searchInput') sInput;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  searchkey = '';
  trending = [];
  recent = [];
  products = [];
  page = 0;
  productList;
  recentproducts;
  showrecent = false;
  showList = false;
  data;

  constructor(private menuCtrl: MenuController,
    private fun: FunctionsService,
    private dataService: DataService,
    private nav: NavController,
    private router: Router,
    private http: HttpcallsService,
    private keyboard: Keyboard,
    private dynamicData: DynamicDataService,
    private storage: Storage,
    private loader: LoaderService,
    private popoverController: PopoverController) {
    this.trending = dataService.trending;
    this.recentproducts = dataService.recent;
  }


  ngOnInit() {
    this.searchkey = '';
    this.data = this.productList = [];
    this.page = 1
    // this.dynamicData.networkConnection.subscribe(status => {
    //   if (status) {
    //     this.http.postRequest('product/list_all.php', {}).subscribe(response => {
    //       if (response['success']) {
    //         this.productList = response['product_list'];
    //       }
    //     })
    //   }
    //   else if (!status) {
    //     //this.router.navigate(['network-state'])
    //   }
    // })
  }
  
  async moreoption(event) {
    const popover = await this.popoverController.create({
      component: PopupMenuComponent,
      event: event,
      cssClass: 'custom-content',
      translucent: false
    });
    return await popover.present();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500)
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(false, 'end');
  }



  search(infiniteScroll?, event?, reset?) {
    if (event | reset) {
      this.page = 1;
      this.data = this.products = []
    } else {
      this.showList = true;
      this.http.postRequest('product/search.php', { searchkey: event.detail.value }).subscribe(response => {
        if (response['success']) {
          this.products = this.data = response['product_list'];
        }
      });
    }
    // this.showrecent = false;
    // let params = {search: this.searchkey ,  category_id: 0, start: this.page }   
    // if (event | reset) {
    //   this.page = 1;
    //   this.products = []
    // }    
    // this.http.postRequest('product/list.php', params, infiniteScroll ? false : true).subscribe(response => {
    //   if(this.page == 1){
    //     this.products = []
    //   }
    //   this.products = this.products.concat(response['product_list']);      
    //   if (event) {
    //     event.target.complete();
    //   }
    //   if (infiniteScroll) {
    //     infiniteScroll.target.complete();
    //   }
    // })
  }

  onChange(value) {
    this.showList = true;
    if (value.length<=2) {
      this.data = [];//this.productList;
    } else {
      this.http.postRequest('product/search.php', { searchkey: value }).subscribe(response => {
        if (response['success']) {
          if (this.searchkey == "") {
            this.data = [];//this.productList;
          } else {
            this.data = response['product_list'];
          }
        }
      });
      // this.data=this.filterByValue(this.productList, event.detail.value)
    }

  }

  filterByValue(array, value) {
    return array;
    // return array.filter((data) => JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  loadDataOnScroll(infiniteScroll) {
    this.page++;
    this.search(infiniteScroll);
    if (this.page === 1000) {
      infiniteScroll.enable(false);
    }
  }


  serachonenter() {
    this.keyboard.hide();
    this.page = 1;
    this.search(null, null, true);
  }

  //   loadData(){   
  //     this.http.postRequest('product/recent.php', { product_id: 1, start: 1 }).subscribe(response => {
  //       if (response['success']) {
  //         this.recent = response['product_data']
  //       }     
  //     })  
  //  } 

  addProductToWishlist(item) {
    this.fun.addtowishlist(item);
  }

  removeProductFromWhishList(list) {
    this.fun.removeFromWhishList(list)
  }

  open(list) {
    console.log(list);
    this.router.navigate(['productdetail', { product_id: list['product_id'], finish: list['finish'], size: list['size'], list: JSON.stringify(list) }]);
  }

  back() {
    this.router.navigate(['/tabs/dashboard', {}])
  }
}
