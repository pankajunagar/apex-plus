import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, DataService } from '../data.service';
import { Router } from '@angular/router';
import { MenuController, IonList, PopoverController } from '@ionic/angular';
import { HttpcallsService } from '../services/httpcalls.service';
import { FunctionsService } from '../functions.service';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { DynamicDataService } from '../services/dynamic-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  @ViewChild('slidingList') slidingList: IonList;

  product_data_1: Array<Product> = [];
  wishlistdata;
  show = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private menuCtrl: MenuController,
    private http: HttpcallsService,
    private fun: FunctionsService,
    private popoverController: PopoverController,
    private dynamicData: DynamicDataService

  ) {
    this.product_data_1 = this.dataService.products_4;
  }

  ngOnInit() {
    this.dynamicData.networkConnection.subscribe(status => {
      if (status) {
        this.http.postRequest('wishlist/list.php', {}).subscribe(wishlistdata => {
          if (wishlistdata['success']) {
            this.wishlistdata = wishlistdata['wishlist_list'];
            console.log(this.wishlistdata)
            if (this.wishlistdata.length > 0) {
              this.show = true;
            }
          }
        })
      }
      else if (!status) {
        //  this.router.navigate(['network-state'])
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

  productdetails(list) {
    console.log(list)
    this.router.navigate(['productdetail', { product_id: list['product_id'], finish: list['finish'], size: list['size'], list: JSON.stringify(list) }]);
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
  }

  browse() {
    this.fun.navigate('/tabs/productcategory', false);
  }

  removefromwishlist(item, j) {
    this.fun.addtowishlist(item)
    this.slidingList.closeSlidingItems();
    this.wishlistdata.splice(j, 1);
    if (this.wishlistdata.length === 0) {
      this.show = !this.show;
    }
  }

  back() {
    this.router.navigate(['/tabs/dashboard', {}])
  }
}
