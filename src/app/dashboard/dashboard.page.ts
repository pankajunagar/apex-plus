import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService, Product } from '../data.service';
import { Router } from '@angular/router';
import { MenuController, PopoverController, IonSlides } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { HttpcallsService } from '../services/httpcalls.service';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx'
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
import { CacheProviderService } from '../cache-provider.service';
import { DynamicDataService } from '../services/dynamic-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Downloader, NotificationVisibility, DownloadRequest } from '@ionic-native/downloader/ngx';
import { promise } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('slider') slider: IonSlides;

  checkAllPromise = new BehaviorSubject(false);

  DashData: Observable<any>;
  sliderData;
  categoryData;
  productSlider;
  catalogue = null;
  homeData;
  slideOpts = {
    loop: true,
    initialSlide: 0,
    speed: 1500,
    autoplaySpeed: 1500,
    autoplay: {
      disableOnInteraction: false,
      allowTouchMove: true
    },

  }
  productImage = [];
  images = [];
  networkStatus;
  slideLen;
  allProductList;
  folderCreated = false;
  categoryList;
  isRefresh;
  allList = [];
  progress: number = 0;
  downloadCount = 0;
  showProgress = false;
  overlayHidden: boolean = true;
  cart_count=0;
  constructor(
    private dataService: DataService,
    private route: Router,
    private menuCtrl: MenuController,
    private fun: FunctionsService,
    private httpcall: HttpcallsService,
    private router: Router,
    private popoverController: PopoverController,
    private file: File,
    private ft: FileTransfer,
    private fileOpener: FileOpener,
    private document: DocumentViewer,
    private platform: Platform,
    private storage: Storage,
    private cacheservice: CacheProviderService,
    private dynamicData: DynamicDataService,
    private cache: CacheService,
    private downloader: Downloader
  ) {
  }

  ngOnInit() {
    // alert("Dashboard");
    this.networkStatus=false;
    this.dynamicData.networkConnection.subscribe(status => {
      if (status) {
        this.LoadData();
      }
      else if (!status) {
        // alert("Dashboard Else");
        // this.router.navigate(['network-state'])
      }
    })
  }

  hideOverlay() {
    this.overlayHidden = true;
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

  ngAfterContentInit(): void {
    this.slideOpts = {
      loop: true,
      initialSlide: 0,
      speed: 1500,
      autoplaySpeed: 1500,
      autoplay: {
        disableOnInteraction: false,
        allowTouchMove: true
      },
      

    }
    this.storage.get('cart_count').then((cart_count) => {
    this.fun.set_message_count(cart_count);
    })
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

  }

  LoadData() {
    // alert("Load Data");
    this.httpcall.postRequest('dashboard/dashboard.php', {}).subscribe(res => {
      if (res['success']) {
        // alert("Success Enter");
        // this.storage.set('dashData', res);
        this.sliderData = res['slider_data'];
        this.slideLen = this.sliderData.length;
        this.homeData = res['home_data']
        this.catalogue = res['catalogue'][0];
        this.isRefresh = res.refresh_local;
        this.storage.set('CATALOUGE_LINK', this.catalogue.link);
        this.storage.set('CATALOUGE_MSG', this.catalogue.msg);
        // this.storage.set('cart_count',res['new_message']);
        this.fun.set_message_count(res['new_message']);
        // alert(this.fun.get_message_count());
        
        
        // alert("product/category.php");
        // this.httpcall.postRequest('product/category.php', {}).subscribe(res => {
        //   if (res['success']) {
        //     // alert("product/category success");
        //     this.categoryList = res.category_list;
        //     // alert("product/category success set");
        //     //this.storage.set('category', this.categoryList);       
        //   }
        // })
        // this.httpcall.postRequest('product/list_all.php',{}).subscribe(res => {
        //    if(res.success){
        //      this.allProductList = res.product_list;
        //     //this.storage.set('ALL_PRODUCTS', this.allProductList);
        //    } 
        // })

        // alert("product/category.php end");
      }
    })
  }


  openProductList(listId, title) {
    //this.router.navigate(['network-state'])
    this.route.navigate(['productlist', { category_id: listId, categoryName: title }])
  }

  // downloadpdf() {
  //   let path = this.file.dataDirectory + 'catalouge';
  //   const transfer = this.ft.create();
  //   transfer.download(this.catalogue.link, `${path}.pdf`).then(entry => {
  //     let url = entry.toURL();
  //     if (this.platform.is('ios')) {
  //       this.document.viewDocument(url, 'application/pdf', {})
  //     } else {
  //       alert('file downloaded')
  //       this.fileOpener.open(url, 'application/pdf')
  //     }
  //   }, error => {
  //     if (error.http_status == 404) {
  //       alert('File not found')
  //     } else {
  //       alert('Something wents wrong')
  //     }

  //   })

  // }

  installationPage(){
    this.route.navigate(['installationlist', {}])
  }

  categoryPage() {

    this.route.navigate(['/tabs/productcategory', {}])
  }

  viewProduct(list) {
    this.route.navigate(['productlist', { category_id: list.category_id, categoryName: list.category_name }])
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
  }
  opendetails(list) {

    this.router.navigate(['productdetail', { product_id: list['product_id'], finish: list['finish'], size: list['size'], list: JSON.stringify(list) }]);
  }
}


