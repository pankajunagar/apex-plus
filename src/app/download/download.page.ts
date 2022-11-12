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
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx'
import { Platform, ToastController } from '@ionic/angular';
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
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {

  checkAllPromise = new BehaviorSubject(false);

  downloadedFiles;
  catalouge_link;
  downloadFile;
  cataMsg;
  messagesData;
  downloadStatus1 = false;
  downloadStatus = false;
  show = false;

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
    private downloader: Downloader,
    private toastController: ToastController,
  ) {
  }

  ngOnInit() {

    this.dynamicData.networkConnection.subscribe(status => {
      if (status) {
        this.LoadData();
        // this.downloadedFiles = 'Downloading Price List.. Please Wait..';
        // // this.toast("Downloading Catalogue.. Please Wait..");
        // this.storage.get('CATALOUGE_LINK').then((cat_link) => {
        //   this.catalouge_link = cat_link;
        //   if (this.catalouge_link == '') {
        //     this.downloadStatus = true;
        //     this.downloadStatus1 = false;
        //     this.storage.get('CATALOUGE_MSG').then((msg) => {
        //       this.cataMsg = msg;
        //       this.downloadedFiles = this.cataMsg;
        //       // this.toast(this.cataMsg);
        //     });
        //   } else {
        //     let path = null;
        //     if (this.platform.is('ios')) {
        //       path = this.file.documentsDirectory + 'pricelist';
        //     } else if (this.platform.is('android')) {
        //       path = this.file.dataDirectory + 'pricelist';
        //     }
        //     // let path = this.file.dataDirectory + 'catalouge';
        //     const transfer = this.ft.create();
        //     transfer.download(this.catalouge_link, `${path}.pdf`).then(entry => {
        //       let url = entry.toURL();
        //       this.downloadFile = url;
        //       this.downloadStatus = true;
        //       this.downloadStatus1 = true;
        //       this.downloadedFiles = 'File Downloaded';
        //       // this.toast(this.downloadedFiles);
        //     }, error => {
        //       if (error.http_status == 404) {
        //         // alert('File not found');
        //         this.toast('File not found');
        //       } else {
        //         // alert('Please Check your internet connection');
        //         this.toast('Please Check your internet connection');
        //       }

        //     })
        //   }
        // });
      }
      else if (!status) {
        // alert("Dashboard Else");
        // this.router.navigate(['network-state'])
      }
    })
  }

  LoadData() {
    this.httpcall.postRequest('messages/list.php', {}).subscribe(res => {
      if (res['success']) {
        this.messagesData = res['messages_data'];
        this.fun.set_message_count(res['new_message']);
        if (this.messagesData.length > 0) {
          this.show = true;
        }
      }
    })
  }

  productdetails(list) {
    this.router.navigate(['productdetail', { product_id: list['product_id'], finish: list['finish'], size: list['size'], list: JSON.stringify(list) }]);
  }

  viewPDF(url) {
    if (this.platform.is('ios')) {
      this.document.viewDocument(url, 'application/pdf', {})
    } else {
      this.downloadedFiles = 'Price List Downloaded.';
      this.fileOpener.open(url, 'application/pdf')
    }
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

  async toast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 7000,
      color: 'primary'
    });
    toast.present();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
  }
}


