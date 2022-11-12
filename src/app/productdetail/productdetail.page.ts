/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 *
 */
import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { DataService, Product, HomeTab } from '../data.service';
import { IonSlides, MenuController, NavController, IonContent, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpcallsService } from '../services/httpcalls.service';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { DynamicDataService } from '../services/dynamic-data.service';
import { Storage } from '@ionic/storage';
import { LoaderService } from '../services/loader.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {

  @ViewChild('Slides') slides: IonSlides;
  @ViewChild('Content') content: IonContent;
  @ViewChild('slider') slider: IonSlides;

  index = 0;
  segment = '';
  // slideOpts = {
  //   effect: 'flip',
  //   zoom: false
  // };
  slideOpts = {
    initialSlide: 0,
    speed: 1500,
    autoplaySpeed: 1500,
    // effect: 'flip',
    autoplay: {
      disableOnInteraction: true,
      allowTouchMove: true
    },

  }
  productDetails;
  finishData;
  sizeData;
  lenghtData;

  data: Array<HomeTab> = [];

  product: Product;
  productId;
  page = 0;
  pList;
  category_id;
  productList = [];
  finish;
  size;
  showPage = false;

  allProducts;


  constructor(
    private menuCtrl: MenuController,
    private fun: FunctionsService,
    private dataService: DataService,
    private nav: NavController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpcallsService,
    private popoverController: PopoverController,
    private storage: Storage,
    private dynamicData: DynamicDataService,
    private loader: LoaderService,) {

    this.product = dataService.current_product;
    this.data = dataService.item_tab;
    this.segment = this.data[0].title;
  }

  ngOnInit() {
    this.dynamicData.networkConnection.subscribe(status => {
      if (status) {
        this.showPage = false;
        this.pList = this.activatedRoute.snapshot.paramMap.get('list');
        this.productId = this.activatedRoute.snapshot.paramMap.get('product_id');
        this.loadData();
      }
      else if (!status) {
        //this.router.navigate(['network-state'])
      }
    })

  }

  loadData() {
    this.pList = JSON.parse(this.pList)
    //alert('plist in load data - '+JSON.stringify(this.pList))
    this.http.postRequest('product/details.php', { product_id: this.pList['product_id'], finish: this.pList['finish'], size: this.pList['size'] }, false).subscribe(res => {
      if (res['success']) {
        this.showPage = true;
        this.productDetails = res;

        console.log(this.productDetails)
      }
    })

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

  childEvent(event) {
    // alert('events in details page - '+JSON.stringify(event))
    this.http.postRequest('product/details.php', { product_id: this.productId, finish: event.finish, size: event.size }, false).subscribe(res => {
      if (res['success']) {
        this.productDetails = res;
        this.pList = { finish: event.finish, size: event.size }
        // alert('plist in click event - '+this.pList)
      }
    })
  }

  enquirypage() {
    this.router.navigate(['enquiry', { productId: this.productId }])
  }

  orderProduct(productData) {
    console.log(JSON.stringify(productData))
    this.router.navigate(['order-product', { list: JSON.stringify(productData) }])
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');

    // alert('startAutoplay');
    // console.log("View ionViewDidEnter");
    // this.slider.slideTo(this.index);
    // this.slider.update();
    // this.slider.startAutoplay();
    // this.slides.getActiveIndex().then(index => {
    //   this.index = index;
    // });
    // this.change();
    // this.slideOpts.initialSlide=this.index;
  }
  ionViewWillLeave() {
    // alert('stopAutoplay');
    // console.log("View ionViewWillLeave");
    // this.slider.stopAutoplay();
    // this.slideOpts.initialSlide=this.index;
  }

  async change() {
    await this.slides.getActiveIndex().then(d => this.index = d);
    this.segment = this.data[this.index].title;
    this.drag();
  }

  onReviewClick(index) {
    this.segment = this.data[index].title;
    this.index = index;
    this.slides.slideTo(index);
    this.content.scrollToTop();
    this.drag();

  }

  addProductToWishlist(item) {
    console.log(item)
    this.fun.addtowishlist(item);
  }

  removeProductFromWhishList(list) {
    this.fun.removeFromWhishList(list)
  }

  goToCart() {
    this.fun.navigate('cart', false);
  }

  update(i) {
    this.slides.slideTo(i);
  }

  drag() {
    let distanceToScroll = 0;
    for (const index in this.data) {
      if (parseInt(index) < this.index) {
        distanceToScroll = distanceToScroll + document.getElementById('seg_' + index).offsetWidth + 24;
      }
    }
    document.getElementById('dag').scrollLeft = distanceToScroll;
  }

  seg(event) {
    this.segment = event.detail.value;
  }

  open(list) {
    // console.log(list);
    this.router.navigate(['productdetail', { product_id: list['product_id'], finish: list['finish'], size: list['size'], list: JSON.stringify(list) }]);
  }

}
