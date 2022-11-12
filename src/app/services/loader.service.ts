import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader_data;

  constructor(
    private loadingController: LoadingController,
    private spinner: NgxSpinnerService
  ) {

  }

  async start() {
    this.spinner.show();
    // this.loader_data = await this.loadingController.create({
    //   spinner: 'circles',
    //   translucent: true,
    //   cssClass: ''
    // });
    // this.loader_data.present();
  }

  stopLoading() {
    this.spinner.hide();
    // if(!this.loader_data){
    //   setTimeout(() => {
    //     this.stopLoading();
    //   }, 100);
    // }else{
    //   this.loader_data.dismiss();
    // }    
  }
}
