/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { Product, DataService } from '../data.service';
import { FunctionsService } from '../functions.service';
import { IonSlides, AlertController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  inputs: ['product', 'slider']
})
export class ProductComponent implements OnInit, OnChanges {
  @ViewChild('Slides') slides: IonSlides;
  @Input() product: any;
  @Input() plist;
  //@Input() slider: IonSlides;

  @Output() notify = new EventEmitter();

  slideOpts = {
    loop: false,
    zoom: false,
    initialSlide: 0,
    speed: 0,
    autoplaySpeed: 1500,
    autoplay: {
      disableOnInteraction: false,
      allowTouchMove: true
    },

  }
  open = [false, false, false, false];
  liked = false;
  productDetails;
  productData;
  finishData;
  sizeData;
  lenghtData;
  materialData
  segment;
  index = 0;
  finishlist;
  sizelist;
  lengthlist;
  materiallist;
  pList;
  proList;
  size_master_id;
  showfinish = false;
  showsize = false;
  slideIndex = 0;
  slideLen;


  constructor(public alertController: AlertController,
    private socialSharing: SocialSharing,
    private fun: FunctionsService,
    private dataService: DataService,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {

    this.pList = this.plist;
    this.productDetails = this.product;
    //alert('product list in component page-'+JSON.stringify(this.pList))
    // alert('Product details on product component - '+JSON.stringify(this.product))

    if (this.productDetails) {
      this.productData = this.productDetails['product_view_data'][0];
      this.slideLen = this.productData.image.length;
      this.finishData = this.productDetails['finish_data'];
      this.sizeData = this.productDetails['size_data'];
      if (this.finishData.length > 0) {
        this.showfinish = true;
      } else {
        this.showfinish = false;
      }

      if (this.sizeData.length > 0) {
        this.showsize = true;
      } else {
        this.showsize = false;
      }

      this.lenghtData = this.productDetails['length_data'];
      this.materialData = this.productDetails['material_data'];
      this.finishlist = Array.prototype.map.call(this.finishData, function (item) { return item.color_master_id; }).join(", ");
      this.sizelist = Array.prototype.map.call(this.sizeData, function (item) { return item.size_master_id; }).join(", ");
      this.lengthlist = Array.prototype.map.call(this.lenghtData, function (item) { return item.length_master_id; }).join(", ");
      this.materiallist = Array.prototype.map.call(this.materialData, function (item) { return item.material_master_id; }).join(", ");

    }
  }

  ngOnChanges() {
    this.ngOnInit();
  //   if (this.slideLen == 1) {
  //     this.slideOpts = {
  //       loop: false,
  //       zoom: false,
  //       initialSlide: 0,
  //       speed: 0,
  //       autoplaySpeed: 150000,
  //       autoplay: {
  //         disableOnInteraction: false,
  //         allowTouchMove: true
  //       },
  //     }
  //   } else {
  //     this.slideOpts = {
  //       loop: false,
  //       zoom: false,
  //       initialSlide: 0,
  //       speed: 0,
  //       autoplaySpeed: 150000,
  //       autoplay: {
  //         disableOnInteraction: false,
  //         allowTouchMove: true
  //       },
  //     }
  //   }
  }


  ngAfterContentInit(): void {
    this.ngOnInit();

    // if (this.slideLen == 1) {
    //   this.slideOpts = {
    //     loop: false,
    //     zoom: false,
    //     initialSlide: 0,
    //     speed: 0,
    //     autoplaySpeed: 150000,
    //     autoplay: {
    //       disableOnInteraction: false,
    //       allowTouchMove: true
    //     },
    //   }
    // } else {
    //   this.slideOpts = {
    //     loop: false,
    //     zoom: false,
    //     initialSlide: 0,
    //     speed: 0,
    //     autoplaySpeed: 150000,
    //     autoplay: {
    //       disableOnInteraction: false,
    //       allowTouchMove: true
    //     },
    //   }
    // }
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }

  //   slideMove(slides: IonSlides){
  //     slides.isEnd().then((end) => {
  //       if(end){
  //        slides.slideTo(0,0)
  //       }
  //     })
  //    slides.isBeginning().then((beg) => {
  //      if(beg){
  //        slides.slideTo(this.slideLen, 0)
  //      }
  //   })
  //  }

  slidesDidLoad(slides: IonSlides) {
    this.ngOnInit();

    // if (this.slideLen == 1) {
    //   this.slideOpts = {
    //     loop: false,
    //     zoom: false,
    //     initialSlide: 0,
    //     speed: 0,
    //     autoplaySpeed: 150000,
    //     autoplay: {
    //       disableOnInteraction: false,
    //       allowTouchMove: true
    //     },
    //   }
    // } else {
    //   this.slideOpts = {
    //     loop: false,
    //     zoom: false,
    //     initialSlide: 0,
    //     speed: 0,
    //     autoplaySpeed: 150000,
    //     autoplay: {
    //       disableOnInteraction: false,
    //       allowTouchMove: true
    //     },
    //   }
    // }
  }

  goToReviews() {
    this.notify.emit(2);
  }

  getDetails(data, id) {
    if (id == 1) {
      this.proList = { finish: data.color_master_id, size: this.pList.size }
      this.notify.emit(this.proList)
    } else if (id == 2) {
      this.proList = { finish: this.pList.finish, size: data.size_master_id }
      this.notify.emit(this.proList)
    }
  }

  async presentToast(message, position, duration, color) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: duration,
      color: color
    });
    toast.present();
  }

  addProductToWishlist(item) {
    this.fun.addtowishlist(item);
  }

  removeProductFromWhishList(list) {
    this.fun.removeFromWhishList(list)
  }

  toogle(i) {
    this.open[i] = !this.open[i];
  }

  // remove() {
  //   this.slider.lockSwipes(true);
  // }

  // gainback() {
  //   this.slider.lockSwipes(false);
  // }

  like() {
    // console.log('like')
    this.liked = !this.liked;
  }

  async createAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Sorry',
      subHeader: 'App not found',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  shareCommon(shareImg) {
    this.socialSharing.share('Checkout this - ' + this.productData.product_name + ' on ApexPlus', 'ApexPlus', shareImg, 'https://apexplus.in/product_details.php?id=' + this.productData.product_id).then(() => {
      // Success!
    }).catch((err) => {
      console.log("An error occurred ", err);
      // Error!
    });
  }


  viewImage(product, slidedata, slideIndex1) {
    //alert(JSON.stringify(product.image))
    this.slideIndex = slideIndex1;
    this.router.navigate(['view-image', { img: JSON.stringify(slidedata), title: this.productData.product_name, index: slideIndex1 }])
  }
  // slideChanged() { 
  //   this.slides.getActiveIndex().then(index => {
  //      //console.log(index);
  //      this.slideIndex = index;
  //   });
  // }
}
