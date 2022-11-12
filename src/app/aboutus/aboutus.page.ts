import { Component, OnInit } from '@angular/core';
import { HttpcallsService } from '../services/httpcalls.service';
import { MenuController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { Storage } from '@ionic/storage';
import { DynamicDataService } from '../services/dynamic-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {

  aboutData;
  info;
  image;

  constructor(
    private http : HttpcallsService,
    private menuCtrl : MenuController,
    private fun : FunctionsService,
    private storage : Storage,
    private dynamicData : DynamicDataService,
    private router : Router
  ) { }

  ngOnInit() {
    this.dynamicData.networkConnection.subscribe(status => {
      if(status){
        this.http.postRequest('about/about.php',{}).subscribe(res => {
          if(res['success']){
           this.storage.set('aboutus', res);
            this.aboutData = res['intro_data'][0];
            this.info = this.aboutData.description;
            this.image = this.aboutData.image;
          }
       })
      }
      else if(!status){
        // this.storage.get('aboutus').then((res) => {
        //   this.aboutData = res['intro_data'][0];
        //   this.info = this.aboutData.description;
        //   this.image = this.aboutData.image;
        // });
       // this.router.navigate(['network-state'])
      }
   })
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
  }

  dismiss(){
    this.fun.back();
  }
}
