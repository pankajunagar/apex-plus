import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx'
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpcallsService } from '../services/httpcalls.service';
import { FunctionsService } from '../functions.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  catalouge_link;
  cartcount;
  constructor(
    private file: File,
    private ft: FileTransfer,
    private fileOpener: FileOpener,
    private document: DocumentViewer,
    private platform: Platform,
    private httpcall: HttpcallsService,
    private storage: Storage,
    private fun: FunctionsService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    // alert("Tabs");
    // this.httpcall.postRequest('dashboard/get_message_count.php', {}).subscribe(res => {
    //   if (res['success']) {
    //     this.fun.set_message_count(res['new_message']);
    //     this.cartcount= this.fun.get_message_count();
    //     // alert(this.fun.get_message_count());
    //   }
    // })
  }

  downloadpdf() {
    this.toast("Downloading Price List.. Please Wait..");
    this.storage.get('CATALOUGE_LINK').then((cat_link) => {
      this.catalouge_link = cat_link;
      let path = this.file.dataDirectory + 'catalouge';
      const transfer = this.ft.create();
      transfer.download(this.catalouge_link, `${path}.pdf`).then(entry => {
        let url = entry.toURL();
        if (this.platform.is('ios')) {
          this.document.viewDocument(url, 'application/pdf', {})
        } else {
          alert('File Downloaded')
          this.fileOpener.open(url, 'application/pdf')
        }
      }, error => {
        if (error.http_status == 404) {
          alert('File not found')
        } else {
          alert('Please Check your internet connection')
        }

      })
    });
  }

  openWeb() {
    window.open("https://apexplus.in", '_system', 'location=yes');
  }

  async toast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 7000,
      color: 'primary'
    });
    toast.present();
  }
}
