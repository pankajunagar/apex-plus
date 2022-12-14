/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicModule } from '@ionic/angular';
import { ProductdetailPage } from './productdetail.page';
import { ProductComponent } from '../product/product.component';
import { MaterialModule } from '../material.module';
import { IonicImageLoader } from 'ionic-image-loader';


const routes: Routes = [
  {
    path: '',
    component: ProductdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SocialSharing],
  declarations: [ProductdetailPage, ProductComponent],
  entryComponents: [ProductComponent]
})
export class ProductdetailPageModule { }
